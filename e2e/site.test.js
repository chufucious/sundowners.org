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

test("homepage loads its shared monospace font and smaller secondary copy", async ({ page }) => {
  await page.goto("/");
  const faces = await page.evaluate(async () => {
    const loaded = await document.fonts.load('14px "Roboto Mono"');
    return loaded.map((face) => ({ family: face.family, status: face.status }));
  });
  expect(faces).toEqual([{ family: "Roboto Mono", status: "loaded" }]);
  const copy = page.locator("#crew p").nth(1);
  await expect(copy).toHaveCSS("font-size", "14px");
  await expect(copy).toHaveCSS("line-height", "22.75px");
  await expect(copy).toHaveCSS("font-family", /Roboto Mono/);
});

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
  // The scroll-linked logo confirms the controls have hydrated.
  await expect(page.getByRole("link", { name: "Sundowners home", exact: true })).toBeVisible();
  await expect(back).toBeHidden();
  await more.click();
  await expect(back).toBeVisible();
  await expect.poll(() => page.locator("#gallery").evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
});

test("homepage gallery opens with fire, a bottom-aligned loop, and fisheye", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#collage video")).toHaveCount(0);
  await expect(page.locator("#gallery > :nth-child(1) img")).toHaveAttribute("alt", "the man lit up above a wall of fire");
  await expect(page.locator("#gallery > :nth-child(3) img")).toHaveAttribute("alt", "Three Sundowners in sunglasses posing for a fisheye portrait");
  const video = page.locator("#gallery > :nth-child(2)");
  await expect(video).toHaveAttribute("aria-label", "Sundowners sign and wax-print flag at dusk");
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v) => v.muted && v.loop && v.playsInline && !v.paused && v.currentTime > 0), {
    timeout: 15_000,
  }).toBe(true);
  expect(await video.evaluate((v) => v.duration)).toBeGreaterThanOrEqual(9);
  const bottomGap = await video.evaluate((v) => v.parentElement.getBoundingClientRect().bottom - v.getBoundingClientRect().bottom);
  expect(Math.abs(bottomGap)).toBeLessThanOrEqual(1);
});

test("article cards on the home page open their post from the photo", async ({ page }) => {
  // The photo is its own link to the post, alongside Read Now.
  for (const [card, path] of [["#rexan-sound-promo", "/rexan-sound-system"], ["#jagged-balls-promo", "/jagged-balls-of-rolling-chaos"]]) {
    await page.goto("/");
    const photo = page.locator(`${card} img`);
    await photo.scrollIntoViewIfNeeded();
    const box = await photo.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page).toHaveURL(path);
  }
});

test("article cards don't click through from empty space", async ({ page }) => {
  // Below the Read Now button, beside the photo: part of the card's row, but
  // neither photo nor text.
  await page.goto("/");
  const button = page.locator("#rexan-sound-promo a", { hasText: "Read Now" });
  await button.scrollIntoViewIfNeeded();
  const photo = await page.locator("#rexan-sound-promo img").boundingBox();
  const box = await button.boundingBox();
  const below = box.y + box.height + 40;
  test.skip(below > photo.y + photo.height, "no empty space below the button at this width");
  await page.mouse.click(box.x + 4, below);
  await expect(page).toHaveURL("/");
});

test("rexan loops play silently and inline", async ({ page }) => {
  // Standing in for GIFs: they must autoplay on iPhones, which needs muted
  // and playsinline, and they loop without controls.
  await page.goto("/rexan-sound-system");
  const videos = page.locator("main video");
  await expect(videos).toHaveCount(3);
  for (const video of await videos.all()) {
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((v) => v.muted && v.loop && v.playsInline && !v.paused && v.currentTime > 0), {
      message: await video.getAttribute("aria-label"),
      timeout: 15_000,
    }).toBe(true);
  }
});
