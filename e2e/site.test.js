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
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://sundowners.org${route}`);
    // The layout declares every social image as 1200×630; check the real file.
    const socialImage = new URL(await page.locator('meta[property="og:image"]').getAttribute("content")).pathname;
    const socialSize = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      return [img.naturalWidth, img.naturalHeight];
    }, socialImage);
    expect(socialSize).toEqual([1200, 630]);

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
  // Click only once hydration has installed the handlers (the scroll-linked
  // logo appears) and the lazy photos have made the strip wider than the screen.
  await expect(page.getByRole("link", { name: "Sundowners home", exact: true })).toBeVisible();
  await expect.poll(() => page.locator("#gallery").evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  await expect(back).toBeHidden();
  await more.click();
  await expect(back).toBeVisible();
  await expect.poll(() => page.locator("#gallery").evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
});

test("homepage gallery opens with fire, a bottom-aligned loop, and fisheye", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#collage video")).toHaveCount(0);
  await expect(page.locator("#gallery > :nth-child(1) img")).toHaveAttribute("alt", "the man lit up above a wall of fire");
  await expect(page.locator("#gallery > :nth-child(3) img")).toHaveAttribute("alt", "Three campmates in sunglasses grinning into a fisheye lens");
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

test("the web app manifest names the site", async ({ request }) => {
  const manifest = await (await request.get("/site.webmanifest")).json();
  expect(manifest.name).toBe("Sundowners");
  expect(manifest.short_name).toBe("Sundowners");
});

test("fonts come from this site, not Google", async ({ page }) => {
  const thirdParty = [];
  page.on("request", (request) => /fonts\.(googleapis|gstatic)\.com/.test(request.url()) && thirdParty.push(request.url()));
  await page.goto("/");
  const faces = await page.evaluate(async () => {
    await document.fonts.load('20px "EB Garamond"');
    await document.fonts.load('italic 20px "EB Garamond"');
    return [...document.fonts].filter((face) => face.family === "EB Garamond" && face.status === "loaded").map((face) => face.style);
  });
  expect(faces.sort()).toEqual(["italic", "normal"]);
  expect(thirdParty).toEqual([]);
});

test("unknown pages get a 404 that points back to camp", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle("Page not found | Sundowners");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("You’ve wandered past the trash fence.");
  await expect(page.getByRole("link", { name: "back to camp" })).toHaveAttribute("href", "/");
  for (const title of ["The Rexan Sound System", "Jagged Balls of Rolling Chaos"]) {
    await expect(page.getByRole("link", { name: new RegExp(`Read Now\\s*:\\s*${title}`) })).toBeVisible();
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});
