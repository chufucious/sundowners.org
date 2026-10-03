import { test, expect } from "@playwright/test";

// Headless browsers report zero hardware insets. Simulate their values to
// exercise layout and handover; real iOS/Android chrome and cutouts remain unverified.
for (const scenario of [
  { name: "device preset, native insets", native: true },
  { name: "desktop, no insets", width: 1280, height: 900, top: 0, left: 0, right: 0, bottom: 0 },
  { name: "Android-sized portrait, no insets", width: 393, height: 851, top: 0, left: 0, right: 0, bottom: 0 },
  { name: "Android-sized landscape, no insets", width: 851, height: 393, top: 0, left: 0, right: 0, bottom: 0 },
  { name: "narrow phone, no insets", width: 320, height: 568, top: 0, left: 0, right: 0, bottom: 0 },
  { name: "phone portrait", width: 390, height: 844, top: 59, left: 0, right: 0, bottom: 34 },
  { name: "phone landscape, left cutout", width: 844, height: 390, top: 0, left: 59, right: 0, bottom: 21 },
  { name: "phone landscape, right cutout", width: 844, height: 390, top: 0, left: 0, right: 59, bottom: 21 },
  { name: "tablet portrait", width: 834, height: 1194, top: 24, left: 0, right: 0, bottom: 20 },
  { name: "tablet landscape", width: 1194, height: 834, top: 24, left: 0, right: 0, bottom: 20 },
]) {
  const { name, native } = scenario;
  test(`${native ? "native" : "simulated"} safe area: ${name} keeps the photo full bleed and logos usable`, async ({ page }) => {
    const { width, height } = native ? page.viewportSize() : scenario;
    if (!native) await page.setViewportSize({ width, height });
    await page.goto("/rexan-sound-system");
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /viewport-fit=cover/);
    const { top, left, right, bottom } = native
      ? await page.evaluate(() => Object.fromEntries(["top", "left", "right", "bottom"].map((side) => [
          side, parseFloat(getComputedStyle(document.documentElement).getPropertyValue(`--safe-area-${side}`)) || 0,
        ])))
      : scenario;
    if (!native) await page.addStyleTag({ content: `:root {
      --safe-area-top: ${top}px;
      --safe-area-left: ${left}px;
      --safe-area-right: ${right}px;
      --safe-area-bottom: ${bottom}px;
    }` });
    await page.evaluate(() => window.dispatchEvent(new Event("resize")));

    const header = page.locator("main > header");
    const full = page.getByRole("link", { name: "sundowners logo", includeHidden: true });
    const compact = page.getByRole("link", { name: "Sundowners home", includeHidden: true });
    await expect(full).toHaveCSS("opacity", "1");
    const box = await header.boundingBox();
    expect(box.x).toBeCloseTo(0, 0);
    expect(box.y).toBeCloseTo(0, 0);
    expect(box.width).toBeCloseTo(width, 0);
    const photo = await header.locator("img[alt^='Rexan at dusk']").boundingBox();
    for (const key of ["x", "y", "width", "height"]) expect(photo[key]).toBeCloseTo(box[key], 0);
    await expect(header.locator("img[alt^='Rexan at dusk']")).toHaveCSS("object-fit", "cover");
    await expect(header.locator("img[alt^='Rexan at dusk']")).toHaveCSS("object-position", "52% 60%");
    const logo = await full.boundingBox();
    expect(logo.y).toBeGreaterThanOrEqual(top);
    expect(logo.x).toBeGreaterThanOrEqual(left);
    expect(logo.x + logo.width).toBeLessThanOrEqual(width - right + 1);
    expect(logo.x + logo.width / 2).toBeCloseTo((left + width - right) / 2, 0);
    const imageWidth = await full.getByRole("img", { name: "sundowners logo", exact: true }).evaluate((image) => image.getBoundingClientRect().width);
    expect(logo.width).toBeCloseTo(imageWidth, 0);
    const backgroundHit = await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest("a"), {
      x: (left + width - right) / 2, y: top + 8,
    });
    expect(backgroundHit).toBe(false);
    const footer = await page.locator("main > footer").boundingBox();
    expect(footer.x).toBeGreaterThanOrEqual(left);
    expect(footer.x + footer.width).toBeLessThanOrEqual(width - right + 1);
    const pageWidth = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
    expect(pageWidth).toBeLessThanOrEqual(width + 1);

    // The status area, rather than the physical screen edge, starts handover.
    await full.evaluate((link, top) => {
      const { y, height } = link.getBoundingClientRect();
      scrollBy(0, y - top + height * 0.25);
    }, top);
    await expect.poll(() => full.evaluate((link) => Number(getComputedStyle(link).opacity))).toBeLessThan(1);
    await expect(full).not.toHaveAttribute("inert");
    await expect(compact).toHaveAttribute("inert", "");

    await header.evaluate((element) => scrollTo(0, element.getBoundingClientRect().bottom + scrollY + 200));
    await expect(full).toHaveAttribute("inert", "");
    await expect(compact).not.toHaveAttribute("inert");
    await expect(compact).toHaveCSS("opacity", "1");
    const small = await compact.boundingBox();
    expect(small.y).toBeGreaterThanOrEqual(top);
    expect(small.width).toBeGreaterThanOrEqual(44);
    expect(small.height).toBeGreaterThanOrEqual(44);
    expect(small.x).toBeGreaterThanOrEqual(left);
    expect(small.x + small.width).toBeLessThanOrEqual(width - right + 1);
    await compact.click();
    await expect(page).toHaveURL("/");
    await expect(full).toHaveCSS("opacity", "1");
  });
}
