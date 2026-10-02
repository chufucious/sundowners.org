import { test, expect } from "@playwright/test";

test("only the header logo navigates home at desktop and phone widths", async ({ page }) => {
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/rexan-sound-system");
    await page.waitForLoadState("networkidle");
    const logo = page.getByRole("link", { name: "sundowners logo", exact: true });
    const bounds = await logo.evaluate((link) => {
      const rect = (element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return { x, y, width, height };
      };
      return { link: rect(link), image: rect(link.querySelector("img")), header: rect(link.closest("header")) };
    });
    expect(bounds.link.width).toBeCloseTo(bounds.image.width, 0);
    expect(bounds.link.x + bounds.link.width / 2).toBeCloseTo(bounds.header.x + bounds.header.width / 2, 0);

    const y = bounds.link.y + bounds.link.height / 2;
    const whitespace = [
      { x: (bounds.header.x + bounds.link.x) / 2, y },
      { x: (bounds.link.x + bounds.link.width + bounds.header.x + bounds.header.width) / 2, y },
      { x: bounds.header.x + bounds.header.width / 2, y: bounds.link.y / 2 },
    ];
    for (const point of whitespace) {
      const hit = await page.evaluate(({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return { link: !!element.closest("a"), cursor: getComputedStyle(element).cursor };
      }, point);
      expect(hit.link).toBe(false);
      expect(hit.cursor).not.toBe("pointer");
      await page.mouse.click(point.x, point.y);
      await expect(page).toHaveURL("/rexan-sound-system");
    }
    await logo.click();
    await expect(page).toHaveURL("/");
  }
});

test("the header logo remains reachable and usable by keyboard", async ({ page, isMobile, browserName }) => {
  test.skip(isMobile, "desktop keyboard navigation");
  await page.goto("/rexan-sound-system");
  await page.waitForLoadState("networkidle");
  const tabKey = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
  await page.keyboard.press(tabKey);
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press(tabKey);
  const logo = page.getByRole("link", { name: "sundowners logo", exact: true });
  await expect(logo).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/");
});
