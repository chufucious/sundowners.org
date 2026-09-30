import { test, expect } from "@playwright/test";

// Use real Tab navigation rather than locator.focus(), which can make an
// unreachable control appear keyboard-accessible.
async function tabTo(page, target, tabKey) {
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press(tabKey);
    if (await target.evaluate((element) => element === document.activeElement)) return;
  }
  await expect(target).toBeFocused();
}

test("keyboard users can skip the header, open an article, and operate its carousel", async ({ page, isMobile, browserName }) => {
  test.skip(isMobile, "desktop keyboard navigation");
  // Safari on macOS uses Option-Tab to include links in keyboard navigation.
  // https://support.apple.com/guide/safari/cpsh003/mac
  const tabKey = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
  await page.goto("/");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await page.keyboard.press(tabKey);
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await page.keyboard.press(tabKey);
  await expect(page.getByRole("link", { name: "safari-theme art car", exact: true })).toBeFocused();
  await page.keyboard.press(tabKey);
  await expect(page.getByRole("link", { name: "Follow Sundowners on Instagram" })).toBeFocused();

  const article = page.getByRole("link", { name: /Read Now\s*:\s*The Rexan Sound System/ });
  await tabTo(page, article, tabKey);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/rexan-sound-system");

  const firstYear = page.getByRole("button", { name: "Show 2017", exact: true });
  await tabTo(page, firstYear, tabKey);
  await page.keyboard.press(tabKey);
  const secondYear = page.getByRole("button", { name: "Show 2018", exact: true });
  await expect(secondYear).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(secondYear).toHaveAttribute("aria-current", "true");

  await page.keyboard.press(tabKey);
  const thirdYear = page.getByRole("button", { name: "Show 2019", exact: true });
  await expect(thirdYear).toBeFocused();
  await page.keyboard.press("Space");
  await expect(thirdYear).toHaveAttribute("aria-current", "true");

  const next = page.getByRole("button", { name: "Next years", exact: true });
  await tabTo(page, next, tabKey);
  const track = page.locator('[aria-roledescription="carousel"] ul');
  const before = await track.evaluate((element) => element.scrollLeft);
  await page.keyboard.press("Enter");
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(before);
  await expect(next).toBeFocused();
});
