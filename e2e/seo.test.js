import { test, expect } from "@playwright/test";

const routes = ["/", "/rexan-sound-system", "/jagged-balls-of-rolling-chaos"];

test("initial HTML canonicalizes tracking and trailing-slash URLs to each production page", async ({ request }) => {
  for (const route of routes) {
    for (const path of [route, route === "/" ? route : `${route}/`]) {
      const response = await request.get(`${path}?utm_source=seo-check`);
      expect(response.status()).toBe(200);
      const html = await response.text();
      const tags = html.match(/<link\b[^>]*rel="canonical"[^>]*>/g);
      expect(tags).toHaveLength(1);
      expect(tags[0]).toContain(`href="https://sundowners.org${route}"`);
    }
  }
  expect((await request.get("/missing-seo-check-page")).status()).toBe(404);
});

test("camp tips social image matches its declared dimensions and stays small", async ({ page, request }) => {
  await page.goto("/jagged-balls-of-rolling-chaos");
  const url = new URL(await page.locator('meta[property="og:image"]').getAttribute("content"));
  const image = await request.get(url.pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/jpeg");
  expect((await image.body()).length).toBeLessThan(300_000);
  const dimensions = await page.evaluate(async (path) => {
    const image = new Image();
    image.src = path;
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  }, url.pathname);
  for (const dimension of ["width", "height"]) {
    const declared = Number(await page.locator(`meta[property="og:image:${dimension}"]`).getAttribute("content"));
    expect(dimensions[dimension]).toBe(declared);
  }
});

test("footer actions meet normal-text contrast in normal, hover and focus states", async ({ page, isMobile }) => {
  await page.goto("/");
  for (const link of await page.locator("footer a").all()) {
    await link.scrollIntoViewIfNeeded();
    for (const state of isMobile ? ["normal", "focus"] : ["normal", "hover", "focus"]) {
      await page.mouse.move(0, 0);
      await link.evaluate((element) => element.blur());
      if (state === "hover") await link.hover();
      if (state === "focus") await link.focus();
      const contrast = await link.evaluate((element) => {
        const style = getComputedStyle(element);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d");
        function luminance(color) {
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
          const rgb = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((value) => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
        }
        const values = [luminance(style.color), luminance(style.backgroundColor)].sort((a, b) => a - b);
        return (values[1] + 0.05) / (values[0] + 0.05);
      });
      expect(contrast, `${await link.textContent()} ${state}`).toBeGreaterThanOrEqual(4.5);
    }
  }
});
