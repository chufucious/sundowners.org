import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

// Every page in the sitemap renders, has its social tags, loads all of its
// images at their real size, and logs no errors.
const routes = [...readFileSync("static/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/sundowners\.org([^<]*)<\/loc>/g)].map(
  ([, path]) => path || "/",
);

for (const route of routes) {
  test(`${route} renders cleanly`, async ({ page }) => {
    test.slow(); // scrolls through every lazy image
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));

    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\/sundowners\.org\//);

    // Scroll through so lazy images load, then check each one decoded.
    const images = page.locator("main img");
    for (const image of await images.all()) {
      if (!(await image.isVisible())) continue; // e.g. collage photos hidden on phones
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0), { message: await image.getAttribute("alt"), timeout: 15_000 }).toBe(true);
    }
    // Every content image carries its dimensions, so nothing shifts as it
    // loads. Decorative images (alt="", e.g. FlameMark's) are sized by CSS.
    const unsized = await page.locator('main img:not([width]):not([alt=""])').evaluateAll((imgs) =>
      imgs.filter((img) => !img.src.endsWith(".svg")).map((img) => img.alt),
    );
    expect(unsized).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("rexan diagrams draw as SVG", async ({ page }) => {
  // Shared diagram parts are separate components; if they ever render in the
  // HTML namespace, their shapes exist but have no size.
  await page.goto("/rexan-sound-system");
  for (const title of ["Overhead view of Rexan's current speaker layout and coverage", "Side view of the 2027 concept showing the line array throwing over the crowd"]) {
    const sizes = await page.getByRole("img", { name: title }).locator("rect, path, circle").evaluateAll((shapes) =>
      shapes.map((shape) => (shape instanceof SVGGraphicsElement ? shape.getBBox().width : 0)),
    );
    expect(sizes.length).toBeGreaterThan(10);
    expect(sizes.every((width) => width > 0)).toBe(true);
  }
});

test("homepage gallery pages with its hints", async ({ page }) => {
  await page.goto("/");
  const more = page.getByRole("button", { name: "more photos →" });
  const back = page.getByRole("button", { name: "← back", includeHidden: true });
  await more.scrollIntoViewIfNeeded();
  await expect(back).toBeHidden();
  await more.click();
  await expect(back).toBeVisible();
  await expect.poll(() => page.locator("#gallery").evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
});
