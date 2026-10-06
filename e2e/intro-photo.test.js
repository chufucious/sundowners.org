import { test, expect } from "@playwright/test";
import { samePaint } from "./paint.js";

// Explicit font loads avoid WebKit's fonts.ready deadlock while hydration is held.
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
const alt = "The Sundowners crew cheering and waving from Rexan’s decks";

test.use({ reducedMotion: "reduce" });

// Compare pixels against the same composition with one layer removed. This
// catches actual fabric-first painting, not merely event order or CSS state.
async function expectLayerPaint(page, testInfo, layer, painted, label) {
  const composition = frame(page);
  const actual = await composition.screenshot({ path: testInfo.outputPath(`${label}.png`), scale: "css" });
  const element = layer === "fabric" ? composition : photo(page);
  const property = layer === "fabric" ? "backgroundImage" : "opacity";
  const previous = await element.evaluate((el, property) => {
    const value = el.style[property];
    el.style[property] = property === "opacity" ? "0" : "none";
    return value;
  }, property);
  let withoutLayer;
  try {
    withoutLayer = await composition.screenshot({ scale: "css" });
  } finally {
    await element.evaluate((el, { property, previous }) => { el.style[property] = previous; }, { property, previous });
  }
  await testInfo.attach(label, { body: actual, contentType: "image/png" });
  expect(await samePaint(page, actual, withoutLayer), `${layer} should ${painted ? "" : "not "}paint`).toBe(!painted);
  await expect(composition).toHaveCSS("opacity", "1");
  await expect(photo(page)).toHaveCSS("opacity", "1");
}

async function expectLoadedPaint(page, testInfo, label = "loaded") {
  await decoded(photo(page));
  await expect(frame(page)).toHaveCSS("background-image", /sunflower/);
  await frame(page).evaluate(async (el) => {
    const image = new Image();
    image.src = getComputedStyle(el).backgroundImage.slice(5, -2);
    await image.decode();
  });
  await expectLayerPaint(page, testInfo, "fabric", true, `${label}-fabric`);
  await expectLayerPaint(page, testInfo, "photo", true, `${label}-photo`);
}

async function settleSurroundings(page) {
  await decoded(page.locator('header img[fetchpriority="high"]'));
  await page.evaluate(() => Promise.all([
    document.fonts.load('14px "Roboto Mono"'),
    document.fonts.load('24px "EB Garamond"'),
  ]));
  await expect(page.locator("#intro h1")).toHaveText(/We’re Sundowners/);
}

async function hydrate(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.locator("#intro h1").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Sundowners home", exact: true })).toBeVisible();
  await page.evaluate(() => scrollTo(0, 0));
}

for (const [name, url] of [["photo", photoURL], ["fabric", fabricURL]]) {
  test(`a slow ${name} never causes fabric-first paint, before or after hydration`, async ({ page }, testInfo) => {
    let releaseAsset, releaseScripts;
    const assetHeld = new Promise((resolve) => { releaseAsset = resolve; });
    const scriptsHeld = new Promise((resolve) => { releaseScripts = resolve; });
    let requests = 0;
    await page.route(url, async (route) => {
      requests++;
      await assetHeld;
      await route.continue();
    });
    await page.route(/\/entry\/start\.[^/]+\.js$/, async (route) => {
      await scriptsHeld;
      await route.continue();
    });
    try {
      await page.goto("/", { waitUntil: "commit" });
      await settleSurroundings(page);
      if (name === "photo") await expect.poll(() => requests).toBeGreaterThan(0);
      else await decoded(photo(page));
      const before = await frame(page).boundingBox();
      const headingBefore = await page.locator("#intro h1").boundingBox();
      await expectLayerPaint(page, testInfo, "fabric", false, "before-hydration");
      if (name === "fabric") await expectLayerPaint(page, testInfo, "photo", true, "native-photo-before-hydration");
      releaseScripts();
      await hydrate(page);
      await expect.poll(() => requests).toBeGreaterThan(0);
      await expectLayerPaint(page, testInfo, "fabric", false, "slow-asset");
      if (name === "fabric") await expectLayerPaint(page, testInfo, "photo", true, "photo-before-fabric");
      await expect(photo(page)).toHaveAttribute("loading", "eager");
      await expect(photo(page)).toHaveAttribute("fetchpriority", "high");
      releaseAsset();
      await expectLoadedPaint(page, testInfo);
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
  test(`the intro stays usable when ${name} cannot load`, async ({ page }, testInfo) => {
    let release;
    const held = new Promise((resolve) => { release = resolve; });
    await page.route(url, async (route) => { await held; await route.abort(); });
    try {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await settleSurroundings(page);
      const before = await frame(page).boundingBox();
      const headingBefore = await page.locator("#intro h1").boundingBox();
      release();
      await page.waitForLoadState("load");
      await expectLayerPaint(page, testInfo, "fabric", false, "failed-asset");
      await expect(photo(page)).toHaveAccessibleName(alt);
      await expect(frame(page).locator("p")).toBeVisible();
      await expect(page.locator("#intro h1")).toBeVisible();
      await page.evaluate(() => scrollTo(0, 0));
      expect(await frame(page).boundingBox()).toEqual(before);
      expect(await page.locator("#intro h1").boundingBox()).toEqual(headingBefore);
      if (name === "fabric") await expectLayerPaint(page, testInfo, "photo", true, "photo-with-failed-fabric");
      else expect(await photo(page).evaluate((img) => img.naturalWidth)).toBe(0);
    } finally {
      release();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

test("resizing before the first responsive photo loads keeps the fabric absent", async ({ page }, testInfo) => {
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
    await hydrate(page);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect.poll(() => requests).toBeGreaterThan(1);
    await settleSurroundings(page);
    await page.evaluate(() => scrollTo(0, 0));
    await expectLayerPaint(page, testInfo, "fabric", false, "resized-pending");
    release();
    await expectLoadedPaint(page, testInfo);
  } finally {
    release();
    await page.unrouteAll({ behavior: "wait" });
  }
});

for (const fails of [false, true]) {
  test(`a replacement responsive photo ${fails ? "fails without leaving fabric" : "loads without a blank frame"}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settleSurroundings(page);
    await expectLoadedPaint(page, testInfo, "small");
    const initial = await photo(page).evaluate((img) => img.currentSrc);
    let release;
    const held = new Promise((resolve) => { release = resolve; });
    let requests = 0;
    await page.route(photoURL, async (route) => {
      requests++;
      await held;
      if (fails) await route.abort();
      else await route.continue();
    });
    try {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await expect.poll(() => requests).toBeGreaterThan(0);
      await settleSurroundings(page);
      await expectLayerPaint(page, testInfo, "photo", true, "old-photo-during-resize");
      release();
      if (fails) {
        await expect(frame(page)).toHaveCSS("background-image", "none");
        await expectLayerPaint(page, testInfo, "fabric", false, "failed-replacement");
        await expect(photo(page)).toHaveAccessibleName(alt);
      } else {
        await expect.poll(() => photo(page).evaluate((img) => img.currentSrc)).not.toBe(initial);
        await expectLoadedPaint(page, testInfo, "large");
      }
    } finally {
      release();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

test("cached photos gain their fabric on reload and client navigation", async ({ page }, testInfo) => {
  // Routing disables the HTTP cache, so this case deliberately uses no routes.
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

test("a failed JavaScript entry leaves the native photo visible without fabric", async ({ page }, testInfo) => {
  await page.route(/\/entry\/start\.[^/]+\.js$/, (route) => route.abort());
  await page.goto("/");
  await settleSurroundings(page);
  await decoded(photo(page));
  await expectLayerPaint(page, testInfo, "photo", true, "failed-js-photo");
  await expectLayerPaint(page, testInfo, "fabric", false, "failed-js-no-fabric");
  await expect(photo(page)).toHaveAccessibleName(alt);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the prerendered photo remains visible without fabric", async ({ page }, testInfo) => {
    await page.goto("/");
    await settleSurroundings(page);
    await decoded(photo(page));
    await expectLayerPaint(page, testInfo, "photo", true, "no-js-photo");
    await expectLayerPaint(page, testInfo, "fabric", false, "no-js-no-fabric");
    await expect(photo(page)).toHaveAccessibleName(alt);
  });
});
