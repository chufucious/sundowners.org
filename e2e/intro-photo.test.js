import { test, expect } from "@playwright/test";
import { samePaint } from "./paint.js";

// We load the two fonts explicitly below. Playwright's default fonts.ready
// wait deadlocks in WebKit while the hydration entry point is held.
const previousFontWait = process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY;
test.beforeAll(() => { process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = "1"; });
test.afterAll(() => {
  if (previousFontWait === undefined) delete process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY;
  else process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = previousFontWait;
});

const photoURL = /\/DSC01143-Edit\.[^/]+\.(avif|webp|jpe?g)$/;
const fabricURL = /\/sunflower\.[^/]+\.webp$/;
const frame = (page) => page.locator("#intro .pattern-frame").first();
const photo = (page) => frame(page).locator("img");
const decoded = (image) => image.evaluate((img) => img.decode());

test.use({ reducedMotion: "reduce" });

// Use screenshots, not just load events or computed styles: the regression
// is the fabric painting across the empty photo, or the photo without its frame.
async function expectPendingPaint(page, testInfo, label) {
  const composition = frame(page);
  const pending = await composition.screenshot({ path: testInfo.outputPath(`${label}.png`), scale: "css" });
  const previous = await composition.evaluate((el) => {
    const opacity = el.style.opacity;
    el.style.opacity = "0";
    return opacity;
  });
  let blank;
  try {
    blank = await composition.screenshot({ scale: "css" });
  } finally {
    await composition.evaluate((el, opacity) => { el.style.opacity = opacity; }, previous);
  }
  await testInfo.attach(label, { body: pending, contentType: "image/png" });
  expect(await samePaint(page, pending, blank), "Neither the photo nor its fabric should paint alone").toBe(true);
  return pending;
}

async function expectLoadedPaint(page, testInfo, label = "photo-and-fabric") {
  await decoded(photo(page));
  await expect(frame(page)).toHaveCSS("opacity", "1");
  const together = await frame(page).screenshot({ path: testInfo.outputPath(`${label}.png`), scale: "css" });
  const background = await frame(page).evaluate((el) => {
    const background = el.style.backgroundImage;
    el.style.backgroundImage = "none";
    return background;
  });
  const withoutFabric = await frame(page).screenshot({ scale: "css" });
  await frame(page).evaluate((el, background) => { el.style.backgroundImage = background; }, background);
  await photo(page).evaluate((el) => { el.style.opacity = "0"; });
  const withoutPhoto = await frame(page).screenshot({ scale: "css" });
  await photo(page).evaluate((el) => { el.style.opacity = ""; });
  await testInfo.attach("photo-and-fabric", { body: together, contentType: "image/png" });
  expect(await samePaint(page, together, withoutFabric), "The loaded fabric should paint around the photo").toBe(false);
  expect(await samePaint(page, together, withoutPhoto), "The loaded photo should paint inside the fabric").toBe(false);
  return together;
}

async function settleSurroundings(page) {
  await decoded(page.locator('header img[fetchpriority="high"]'));
  // WebKit's fonts.ready waits for DOMContentLoaded, deliberately held below.
  await page.evaluate(() => Promise.all([
    document.fonts.load('14px "Roboto Mono"'),
    document.fonts.load('24px "EB Garamond"'),
  ]));
  await expect(page.locator("#intro h1")).toHaveText(/We’re Sundowners/);
}

for (const [name, url, other] of [["photo", photoURL, fabricURL], ["fabric", fabricURL, photoURL]]) {
  test(`intro waits for a slow ${name}, before and after hydration`, async ({ page }, testInfo) => {
    let releaseAsset, releaseScripts;
    const assetHeld = new Promise((resolve) => { releaseAsset = resolve; });
    const scriptsHeld = new Promise((resolve) => { releaseScripts = resolve; });
    let requests = 0;
    await page.route(url, async (route) => {
      requests++;
      await assetHeld;
      await route.continue();
    });
    // Keep hydration pending while the prerendered HTML and CSS paint.
    await page.route(/\/entry\/start\.[^/]+\.js$/, async (route) => {
      await scriptsHeld;
      await route.continue();
    });
    const otherLoaded = page.waitForResponse(other).then((response) => response.finished());
    try {
      await page.goto("/", { waitUntil: "commit" });
      await expect.poll(() => requests).toBeGreaterThan(0);
      await otherLoaded;
      await settleSurroundings(page);
      const before = await frame(page).boundingBox();
      const headingBefore = await page.locator("#intro h1").boundingBox();
      await expectPendingPaint(page, testInfo, "before-hydration");
      releaseScripts();
      await page.waitForLoadState("domcontentloaded");
      // Scrolling exercises a hydrated event handler without adding a test hook.
      await page.locator("#intro h1").scrollIntoViewIfNeeded();
      await expect(page.getByRole("link", { name: "Sundowners home", exact: true })).toBeVisible();
      await page.evaluate(() => scrollTo(0, 0));
      const pending = await expectPendingPaint(page, testInfo, "slow-asset");
      releaseAsset();
      const loaded = await expectLoadedPaint(page, testInfo);
      expect(await samePaint(page, pending, loaded)).toBe(false);
      await page.evaluate(() => scrollTo(0, 0));
      expect(await frame(page).boundingBox()).toEqual(before);
      expect(await page.locator("#intro h1").boundingBox()).toEqual(headingBefore);
    } finally {
      releaseAsset();
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

for (const [name, url] of [["photo", photoURL], ["fabric", fabricURL], ["both images", /\/(DSC01143-Edit|sunflower)\.[^/]+\.(avif|webp|jpe?g)$/]]) {
  test(`intro remains usable if ${name} fails`, async ({ page }) => {
    await page.route(url, (route) => route.abort());
    await page.goto("/");
    await expect(frame(page)).toHaveCSS("opacity", "1");
    await expect(photo(page)).toHaveAttribute("alt", "The Sundowners crew cheering and waving from Rexan’s decks");
    await expect(frame(page).locator("p")).toBeVisible();
    await expect(page.locator("#intro h1")).toBeVisible();
    const size = await photo(page).evaluate((img) => ({
      width: img.clientWidth, height: img.clientHeight,
      ratio: Number(img.getAttribute("width")) / Number(img.getAttribute("height")),
    }));
    expect(Math.abs(size.height - size.width / size.ratio)).toBeLessThanOrEqual(1);
    if (name === "fabric") await decoded(photo(page));
  });
}

test("resizing while the responsive photo loads keeps the composition hidden", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let release;
  const held = new Promise((resolve) => { release = resolve; });
  let requests = 0;
  await page.route(photoURL, async (route) => {
    requests++;
    await held;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect.poll(() => requests).toBeGreaterThan(0);
    await settleSurroundings(page);
    await page.locator("#intro h1").scrollIntoViewIfNeeded();
    await expect(page.getByRole("link", { name: "Sundowners home", exact: true })).toBeVisible();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect.poll(() => requests).toBeGreaterThan(1);
    await settleSurroundings(page); // The header can select a new source too.
    await page.evaluate(() => scrollTo(0, 0));
    await expectPendingPaint(page, testInfo, "resized-pending");
    release();
    await expectLoadedPaint(page, testInfo);
  } finally {
    release();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test("cached intro reveals again on reload and client navigation", async ({ page }, testInfo) => {
  // No routes: Playwright request routing disables the browser HTTP cache.
  // Compare each visit with its own missing-layer references: Chrome can round
  // composited pixels by one RGB level differently across navigations.
  await page.goto("/");
  await settleSurroundings(page);
  await expectLoadedPaint(page, testInfo, "initial");
  await page.reload();
  await settleSurroundings(page);
  await expectLoadedPaint(page, testInfo, "reloaded");
  const originalDocument = await page.evaluateHandle(() => document);
  await page.locator('#intro a[href="/rexan-sound-system"]').click();
  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await expect(page).toHaveURL("/");
  await settleSurroundings(page);
  await expectLoadedPaint(page, testInfo, "returned");
  expect(await originalDocument.evaluate((initial) => initial === document)).toBe(true);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the prerendered intro photo and fabric remain visible", async ({ page }, testInfo) => {
    await page.goto("/");
    await settleSurroundings(page);
    await expectLoadedPaint(page, testInfo);
    await expect(photo(page)).toHaveAccessibleName("The Sundowners crew cheering and waving from Rexan’s decks");
  });
});
