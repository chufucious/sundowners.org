import { test, expect } from "@playwright/test";
import { samePaint } from "./paint.js";

// Each layout's tint is the average of its sampled header edge (header-colors.js).
const tints = {
  banner: { mobile: "#3d4856", desktop: "#434b57" },
  guide: { mobile: "#3d4856", desktop: "#635559" },
  rexan: { mobile: "#24334b", desktop: "#213047" },
};

test("client navigation updates the hero and one set of social tags", async ({ page }) => {
  await page.goto("/");
  const originalDocument = await page.evaluateHandle(() => document);
  const banner = "Sundowners walking in Black Rock City";
  const header = page.locator("main > header");
  const homeHeight = (await header.boundingBox()).height;
  const homeImage = await header.getByRole("img", { name: banner, exact: true }).evaluate((image) => image.src);

  async function checkPage({ path, title, description, image, type, hero = banner, tint = tints.banner }) {
    await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(title);
    await checkTint(page, tint);
    for (const [selector, content] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', `https://sundowners.org${path}`],
      ['meta[property="og:type"]', type],
      ['meta[property="og:image"]', image],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="twitter:image"]', image],
    ]) {
      const tag = page.locator(selector);
      await expect(tag).toHaveCount(1);
      await expect(tag).toHaveAttribute("content", content);
    }
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", `https://sundowners.org${path}`);
    await expect(header.getByRole("img", { name: hero, exact: true })).toBeVisible();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    // A reload would hide stale layout state; this must stay in the same document.
    expect(await originalDocument.evaluate((initial) => initial === document)).toBe(true);
  }

  const home = {
    path: "/",
    title: "Sundowners | Burning Man Camp & Rexan Art Car",
    description: /^Sundowners is a Burning Man camp/,
    image: "https://sundowners.org/og-image.jpg",
    type: "website",
  };
  await checkPage(home);
  const homeGradient = await sampledEdge(page);
  await page.getByRole("link", { name: /Read Now\s*:\s*The Rexan Sound System/ }).click();
  await checkPage({
    path: "/rexan-sound-system",
    title: "The Rexan Art Car Sound System | Sundowners",
    description: /^How we built a solar-powered QSC rig/,
    image: /^https:\/\/sundowners\.org\/.*hero-rexan-dusk.*\.jpe?g$/,
    type: "article",
    hero: "Rexan at dusk on the playa, headlight eyes glowing blue, speakers and lanterns on the top deck",
    tint: tints.rexan,
  });
  expect((await header.boundingBox()).height).toBeGreaterThan(page.viewportSize().height * 0.7);
  expect(await sampledEdge(page)).not.toBe(homeGradient);

  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await checkPage(home);
  await page.goBack();
  await expect(page).toHaveURL("/rexan-sound-system");
  await checkTint(page, tints.rexan);
  await page.goForward();
  await checkPage(home);
  expect(await sampledEdge(page)).toBe(homeGradient);
  await expect.poll(() => header.getByRole("img", { name: banner, exact: true }).evaluate((image) => image.src)).toBe(homeImage);
  expect((await header.boundingBox()).height).toBe(homeHeight);

  await page.getByRole("link", { name: /Read Now\s*:\s*Jagged Balls of Rolling Chaos/ }).click();
  await checkPage({
    path: "/jagged-balls-of-rolling-chaos",
    title: "Jagged Balls of Rolling Chaos: Burning Man Camp Tips | Sundowners",
    description: /^Hard-won Burning Man camp tips/,
    image: /^https:\/\/sundowners\.org\/.*jagged-balls-of-rolling-chaos.*\.jpe?g$/,
    type: "article",
    tint: tints.guide,
  });
  await expect.poll(() => header.getByRole("img", { name: banner, exact: true }).evaluate((image) => image.src)).toBe(homeImage);
  const compactHeight = (await header.boundingBox()).height;
  if (page.viewportSize().width >= 768) expect(compactHeight).toBeLessThan(homeHeight);
  else expect(compactHeight).toBe(homeHeight);
  const jaggedGradient = await sampledEdge(page);
  if (page.viewportSize().width >= 768) expect(jaggedGradient).not.toBe(homeGradient);
  else expect(jaggedGradient).toBe(homeGradient);

  await header.getByRole("link", { name: "sundowners logo" }).click();
  await checkPage(home);
  expect((await header.boundingBox()).height).toBe(homeHeight);

  await page.goBack();
  await expect(page).toHaveURL("/jagged-balls-of-rolling-chaos");
  await checkTint(page, tints.guide);
  await page.goForward();
  await checkPage(home);
});

test("an uncached Rexan hero paints its placeholder during client navigation", async ({ page }, testInfo) => {
  await page.goto("/");
  const header = page.locator("main > header");
  const photo = header.locator('img[fetchpriority="high"]');
  await expect.poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  const originalDocument = await page.evaluateHandle(() => document);

  let releaseHero;
  const heroHeld = new Promise((resolve) => { releaseHero = resolve; });
  let requests = 0;
  // A fresh browser context and routing keep this navigation uncached. Hold
  // every format/size, including the one selected by <picture> on Retina screens.
  await page.route(/\/hero-rexan-dusk\.[^/]+\.(avif|webp|jpe?g)$/, async (route) => {
    requests++;
    await heroHeld;
    await route.continue();
  });

  try {
    await page.getByRole("link", { name: /Read Now\s*:\s*The Rexan Sound System/ }).click();
    await expect(page).toHaveURL("/rexan-sound-system");
    await expect(photo).toHaveAttribute("alt", /^Rexan at dusk/);
    await expect.poll(() => requests).toBeGreaterThan(0);
    await expect.poll(() => photo.evaluate((image) => image.complete)).toBe(false);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    expect(await originalDocument.evaluate((initial) => initial === document)).toBe(true);

    await expectPlaceholderPainted(page, header, photo, testInfo);

    releaseHero();
    await expect.poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0 && image.currentSrc.includes("hero-rexan-dusk"))).toBe(true);
  } finally {
    releaseHero();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test("the banner paints a placeholder when client navigation returns home", async ({ page }, testInfo) => {
  await page.goto("/rexan-sound-system");
  const header = page.locator("main > header");
  const photo = header.locator('img[fetchpriority="high"]');
  await expect.poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  const originalDocument = await page.evaluateHandle(() => document);

  let releaseBanner;
  const bannerHeld = new Promise((resolve) => { releaseBanner = resolve; });
  let requests = 0;
  await page.route(/\/sundownerswalking\.[^/]+\.(avif|webp|jpe?g)$/, async (route) => {
    requests++;
    await bannerHeld;
    await route.continue();
  });

  try {
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL("/");
    await expect(photo).toHaveAttribute("alt", "Sundowners walking in Black Rock City");
    await expect.poll(() => requests).toBeGreaterThan(0);
    await expect.poll(() => photo.evaluate((image) => image.complete)).toBe(false);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    expect(await originalDocument.evaluate((initial) => initial === document)).toBe(true);

    await expectPlaceholderPainted(page, header, photo, testInfo);

    releaseBanner();
    await expect.poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0 && image.currentSrc.includes("sundownerswalking"))).toBe(true);
  } finally {
    releaseBanner();
    await page.unrouteAll({ behavior: "wait" });
  }
});

// Compare actual paint: an img with updated attributes can still display its
// previous bitmap, and an empty header would match a hidden photo too. So the
// pending header must look like the placeholder alone, and not like nothing.
// Crop below the animated logo and above the border.
async function expectPlaceholderPainted(page, header, photo, testInfo) {
  // The intro overlaps this crop on home. Keep that foreground stable while
  // comparing the header layers, including on a slower deployed preview.
  const intro = page.locator("#intro .pattern-frame").first();
  if (await intro.count()) {
    await intro.locator("img").evaluate((image) => image.decode());
    await expect(intro).toHaveCSS("opacity", "1");
  }
  const box = await header.boundingBox();
  const clip = { x: box.x, y: box.y + box.height / 2, width: box.width, height: box.height / 2 - 12 };
  const layers = [photo, header.getByTestId("header-placeholder")];
  await expect(layers[1]).toHaveCount(1);
  const pending = await page.screenshot({ clip, scale: "css" });
  const shots = [];
  const previous = [];
  try {
    for (const layer of layers) {
      previous.push(await layer.evaluate((element) => {
        const opacity = element.style.opacity;
        element.style.opacity = "0";
        return opacity;
      }));
      shots.push(await page.screenshot({ clip, scale: "css" }));
    }
  } finally {
    for (const [i, opacity] of previous.entries()) {
      await layers[i].evaluate((element, opacity) => { element.style.opacity = opacity; }, opacity);
    }
  }
  const [placeholder, bare] = shots;
  await testInfo.attach("pending-header", { body: pending, contentType: "image/png" });
  await testInfo.attach("placeholder-reference", { body: placeholder, contentType: "image/png" });
  await testInfo.attach("bare-header", { body: bare, contentType: "image/png" });
  expect(await samePaint(page, pending, placeholder), "The unloaded photo should paint its placeholder, without the previous page's photo").toBe(true);
  expect(await samePaint(page, pending, bare), "The header should not paint empty while its photo loads").toBe(false);
}

async function checkTint(page, { mobile, desktop }) {
  // Browsers use the first theme-color whose media matches.
  const tags = page.locator('meta[name="theme-color"]');
  await expect(tags).toHaveCount(2);
  await expect(tags.first()).toHaveAttribute("media", "(min-width: 48rem)");
  await expect(tags.first()).toHaveAttribute("content", desktop);
  await expect(tags.last()).toHaveAttribute("content", mobile);
  const tint = page.viewportSize().width >= 768 ? desktop : mobile;
  const rgb = `rgb(${[1, 3, 5].map((i) => parseInt(tint.slice(i, i + 2), 16)).join(", ")})`;
  await expect(page.locator("html")).toHaveCSS("background-color", rgb);
  await expect(page.locator("body")).toHaveCSS("background-color", rgb);
  await expect(page.locator("html")).toHaveCSS("background-image", "none");
  await expect(page.locator("body")).toHaveCSS("background-image", "none");
  expect((await sampledEdge(page)).match(/#[\da-f]{6}/gi)).toHaveLength(8);
  const fade = page.locator('header > div[style*="--header-edge"]');
  const background = await fade.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(background.match(/linear-gradient/g)).toHaveLength(2);
}

const sampledEdge = (page) => page.locator("html").evaluate((el) =>
  getComputedStyle(el).getPropertyValue("--header-edge").trim());

test.describe("direct loads before hydration", () => {
  test.use({ javaScriptEnabled: false });
  test("header tint is present on each route without JavaScript", async ({ page }) => {
    for (const [route, tint] of [
      ["/", tints.banner],
      ["/rexan-sound-system", tints.rexan],
      ["/jagged-balls-of-rolling-chaos", tints.guide],
    ]) {
      await page.goto(route);
      await checkTint(page, tint);
    }
  });
});
