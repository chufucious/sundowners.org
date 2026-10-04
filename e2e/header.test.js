import { test, expect } from "@playwright/test";

// The full logo scrolls up with the header; as it slides off the top of the
// screen it hands over to the compact flame lion in step with the scroll,
// staggered: the full logo fades out first, then the compact one fades in.
// Whichever is mostly hidden stays out of reach (inert).

const compact = (page) => page.getByRole("link", { name: "Sundowners home", includeHidden: true });

const full = (page) => page.getByRole("link", { name: "sundowners logo", includeHidden: true });

// Scrolls the full logo `fraction` of its height off the top of the screen.
const scrollLogoOff = (page, fraction) =>
  full(page).evaluate((logo, fraction) => {
    const { top, height } = logo.getBoundingClientRect();
    scrollBy(0, top + height * fraction);
  }, fraction);

// Scrolls until the header (and its logo) is just out of view, or further.
const scrollPastHeader = (page, extra = 200) =>
  page.locator("main > header").evaluate((header, extra) => scrollTo(0, header.getBoundingClientRect().bottom + scrollY + extra), extra);

test("the still mark stands in while the flame's WebGL context is lost", async ({ page }) => {
  // iOS drops WebGL contexts under memory pressure and in long-backgrounded
  // tabs; the logo must never go blank.
  await page.goto("/");
  const canvas = full(page).locator("canvas");
  const still = full(page).locator('img[alt=""]');
  await expect(canvas).toBeVisible();
  await canvas.evaluate((c) => (window.loseFlame = c.getContext("webgl").getExtension("WEBGL_lose_context")).loseContext());
  await expect(still).toBeVisible();
  await expect(canvas).toBeHidden();
  await page.evaluate(() => window.loseFlame.restoreContext());
  await expect(canvas).toBeVisible();
  await expect(still).toBeHidden();
});

test("flames draw at the screen's pixel density, up to 3x", async ({ page }) => {
  await page.goto("/");
  const canvas = full(page).locator("canvas");
  await expect(canvas).toBeVisible();
  const { width, cssWidth, dpr } = await canvas.evaluate((c) => ({ width: c.width, cssWidth: c.clientWidth, dpr: devicePixelRatio }));
  expect(width).toBe(Math.round(cssWidth * Math.min(dpr, 3)));
});

test("flames cap drawing at 30 fps and pause/resume with logo and page visibility", async ({ page }) => {
  await page.addInitScript(() => {
    window.flameDraws = new WeakMap();
    const draw = WebGLRenderingContext.prototype.drawArrays;
    WebGLRenderingContext.prototype.drawArrays = function (...args) {
      window.flameDraws.set(this.canvas, (window.flameDraws.get(this.canvas) ?? 0) + 1);
      return draw.apply(this, args);
    };
  });
  await page.goto("/rexan-sound-system");
  const headerCanvas = full(page).locator("canvas");
  const compactCanvas = compact(page).locator("canvas");
  const count = (canvas) => canvas.evaluate((el) => window.flameDraws.get(el) ?? 0);
  const sample = () => page.evaluate(async () => {
    const canvases = [...document.querySelectorAll("canvas")];
    const before = canvases.map((el) => window.flameDraws.get(el) ?? 0);
    const start = performance.now();
    await new Promise((resolve) => setTimeout(resolve, 1100));
    return canvases.map((el, i) => ({
      frames: (window.flameDraws.get(el) ?? 0) - before[i],
      fps: ((window.flameDraws.get(el) ?? 0) - before[i]) * 1000 / (performance.now() - start),
    }));
  });
  await expect.poll(() => count(headerCanvas)).toBeGreaterThan(0);
  let [header, small] = await sample();
  expect(header.frames).toBeGreaterThan(0);
  expect(header.fps).toBeLessThanOrEqual(31);
  expect(small.frames).toBe(0);

  await scrollPastHeader(page);
  await expect.poll(() => count(compactCanvas)).toBeGreaterThan(0);
  [header, small] = await sample();
  expect(header.frames).toBe(0);
  expect(small.frames).toBeGreaterThan(0);
  expect(small.fps).toBeLessThanOrEqual(31);

  // Exercise the visibility handler deterministically in headless browsers.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  [header, small] = await sample();
  expect(header.frames).toBe(0);
  expect(small.frames).toBe(0);
  const pausedCount = await count(compactCanvas);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => count(compactCanvas)).toBeGreaterThan(pausedCount);

  await page.evaluate(() => scrollTo(0, 0));
  await expect(full(page)).toHaveCSS("opacity", "1");
  [header, small] = await sample();
  expect(header.frames).toBeGreaterThan(0);
  expect(header.fps).toBeLessThanOrEqual(31);
  expect(small.frames).toBe(0);
});

test("full and compact logos hand over with the scroll as the header logo leaves", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await expect(full(page)).toHaveCSS("opacity", "1");
  const opacity = (logo) => logo.evaluate((el) => Number(getComputedStyle(el).opacity));

  // A quarter off: the full logo is fading, the compact one hasn't started.
  await scrollLogoOff(page, 0.25);
  await expect.poll(() => opacity(full(page))).toBeLessThan(1);
  await expect.poll(() => opacity(full(page))).toBeGreaterThan(0);
  await expect.poll(() => opacity(compact(page))).toBe(0);
  await expect(full(page)).not.toHaveAttribute("inert");
  await expect(compact(page)).toHaveAttribute("inert", "");

  // Three quarters off: the full logo is gone, the compact one mostly in.
  await scrollLogoOff(page, 0.75);
  await expect.poll(() => opacity(full(page))).toBe(0);
  await expect.poll(() => opacity(compact(page))).toBeGreaterThan(0.5);
  await expect(full(page)).toHaveAttribute("inert", "");
  await expect(compact(page)).not.toHaveAttribute("inert");
});

test("compact logo appears only after the header logo scrolls away", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await expect(compact(page)).toHaveAttribute("inert", "");
  await expect(compact(page)).toHaveCSS("opacity", "0");

  await scrollPastHeader(page);
  await expect(compact(page)).not.toHaveAttribute("inert");
  await expect(compact(page)).toHaveCSS("opacity", "1");

  await page.evaluate(() => scrollTo(0, 0));
  await expect(compact(page)).toHaveAttribute("inert", "");
  await expect(full(page)).toHaveCSS("opacity", "1");
  await expect(full(page)).not.toHaveAttribute("inert");
});

test("compact logo goes home", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await scrollPastHeader(page);
  await compact(page).click();
  await expect(page).toHaveURL("/");
});

test("compact logo on the homepage returns to the top", async ({ page }) => {
  await page.goto("/");
  await scrollPastHeader(page, 1000);
  await compact(page).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("compact logo on the homepage glides to the top instead of jumping", async ({ page }) => {
  await page.goto("/");
  await scrollPastHeader(page, 3000);
  const start = await page.evaluate(() => scrollY);
  const entries = await page.evaluate(() => history.length);
  await compact(page).click();
  // Straight after the click it's still on its way up, not already at the top.
  const justAfter = await page.evaluate(() => scrollY);
  expect(justAfter).toBeGreaterThan(0);
  expect(justAfter).toBeLessThanOrEqual(start);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  // Scrolling in place: no navigation, no new history entry.
  await expect(page).toHaveURL("/");
  expect(await page.evaluate(() => history.length)).toBe(entries);
});

test("compact logo jumps straight to the top when motion is reduced", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await scrollPastHeader(page, 3000);
  await compact(page).click();
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("the rexan post leads with its own photo as the header", async ({ page }) => {
  // The page supplies headerImage from its load(); other pages keep the
  // default banner at its usual height.
  await page.goto("/rexan-sound-system");
  const hero = page.locator("main > header img[alt^='Rexan at dusk']");
  await expect(hero).toBeVisible();
  const { height } = await page.locator("main > header").boundingBox();
  expect(height).toBeGreaterThan(page.viewportSize().height * 0.7);

  await page.goto("/");
  await expect(page.locator("main > header img[alt='Sundowners walking in Black Rock City']")).toBeVisible();
});
