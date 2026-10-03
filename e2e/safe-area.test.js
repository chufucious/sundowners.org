import { test, expect } from "@playwright/test";

// Use the configured desktop, Android, iPhone and tablet presets. Headless
// browsers don't reproduce physical cutouts or iOS/Android browser chrome.
test("homepage header fills the viewport and both logo links stay usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /viewport-fit=cover/);
  const header = page.locator("main > header");
  const box = await header.boundingBox();
  const width = page.viewportSize().width;
  expect(box.x).toBeCloseTo(0, 0);
  expect(box.y).toBeCloseTo(0, 0);
  expect(box.width).toBeCloseTo(width, 0);
  const photo = header.locator('img[fetchpriority="high"]');
  const image = await photo.boundingBox();
  for (const key of ["x", "y", "width", "height"]) expect(image[key]).toBeCloseTo(box[key], 0);
  await expect(photo).toHaveCSS("object-fit", "cover");
  const full = page.getByRole("link", { name: "sundowners logo", includeHidden: true });
  const compact = page.getByRole("link", { name: "Sundowners home", includeHidden: true });
  const logo = await full.boundingBox();
  expect(logo.x).toBeGreaterThanOrEqual(0);
  expect(logo.x + logo.width).toBeLessThanOrEqual(width + 1);
  expect(logo.width).toBeCloseTo((await full.getByRole("img", { name: "sundowners logo" }).boundingBox()).width, 0);
  await expect(full).not.toHaveAttribute("inert");
  await expect(compact).toHaveAttribute("inert", "");
  // Check the hit target without starting a same-page navigation before scroll.
  await full.click({ trial: true });
  await header.evaluate((element) => scrollTo(0, element.getBoundingClientRect().bottom + scrollY + 200));
  await expect(full).toHaveAttribute("inert", "");
  await expect(compact).not.toHaveAttribute("inert");
  await expect(compact).toHaveCSS("opacity", "1");
  expect((await compact.boundingBox()).y).toBeGreaterThanOrEqual(0);
  await compact.click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const pageWidth = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
  expect(pageWidth).toBeLessThanOrEqual(width + 1);
});

test("simulated safe insets keep both article headers full bleed and logos clear", async ({ page }, testInfo) => {
  // One WebKit phone covers nonzero insets; don't multiply simulated scenarios
  // across every preset. Real browser chrome still needs a device check.
  test.skip(testInfo.project.name !== "iphone", "simulated insets use the WebKit phone project");
  for (const { route, width, height, top, left, right } of [
    { route: "/rexan-sound-system", width: 390, height: 844, top: 59, left: 0, right: 0 },
    { route: "/jagged-balls-of-rolling-chaos", width: 844, height: 390, top: 0, left: 59, right: 59 },
  ]) {
    await test.step(route, async () => {
      await page.setViewportSize({ width, height });
      await page.goto(route);
      await page.addStyleTag({ content: `:root { --safe-area-top: ${top}px; --safe-area-left: ${left}px; --safe-area-right: ${right}px; }` });
      await page.evaluate(() => window.dispatchEvent(new Event("resize")));
      const header = page.locator("main > header");
      const box = await header.boundingBox();
      expect(box.x).toBeCloseTo(0, 0);
      expect(box.y).toBeCloseTo(0, 0);
      expect(box.width).toBeCloseTo(width, 0);
      const photo = header.locator('img[fetchpriority="high"]');
      const image = await photo.boundingBox();
      for (const key of ["x", "y", "width", "height"]) expect(image[key]).toBeCloseTo(box[key], 0);
      await expect(photo).toHaveCSS("object-fit", "cover");
      if (route === "/rexan-sound-system") await expect(photo).toHaveCSS("object-position", "52% 60%");
      const full = page.getByRole("link", { name: "sundowners logo", includeHidden: true });
      const compact = page.getByRole("link", { name: "Sundowners home", includeHidden: true });
      const logo = await full.boundingBox();
      expect(logo.y).toBeGreaterThanOrEqual(top);
      expect(logo.x).toBeGreaterThanOrEqual(left);
      expect(logo.x + logo.width).toBeLessThanOrEqual(width - right + 1);
      const footer = await page.locator("main > footer").boundingBox();
      expect(footer.x).toBeGreaterThanOrEqual(left);
      expect(footer.x + footer.width).toBeLessThanOrEqual(width - right + 1);
      await header.evaluate((element) => scrollTo(0, element.getBoundingClientRect().bottom + scrollY + 200));
      await expect(full).toHaveAttribute("inert", "");
      await expect(compact).not.toHaveAttribute("inert");
      await expect(compact).toHaveCSS("opacity", "1");
      expect((await compact.boundingBox()).y).toBeGreaterThanOrEqual(top);
      await compact.click();
      await expect(page).toHaveURL("/");
      const pageWidth = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
      expect(pageWidth).toBeLessThanOrEqual(width + 1);
    });
  }
});
