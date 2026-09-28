import { test, expect } from "@playwright/test";

// Wide screens (87rem+) pin the table of contents in the left margin;
// narrower ones show it inline under the title.

test("phones show it inline, and its links jump", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone layout");
  await page.goto("/rexan-sound-system");
  const toc = page.getByRole("navigation", { name: "On this page" });
  await expect(toc).toBeVisible();
  await toc.getByRole("link", { name: "What broke (and what we learned)" }).click();
  await expect(page.locator("#what-broke")).toBeInViewport();
});

test.describe("wide screens", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test.skip(({ isMobile }) => isMobile, "desktop-only layout");

  test.beforeEach(async ({ page }) => {
    await page.goto("/rexan-sound-system");
  });

  test("links jump to their section and mark it", async ({ page }) => {
    const toc = page.getByRole("navigation", { name: "On this page" });
    await toc.getByRole("link", { name: "Keeping it green" }).click();
    await expect(page).toHaveURL(/#keeping-it-green$/);
    await expect(page.locator("#keeping-it-green")).toBeInViewport();
    await expect(toc.locator('[aria-current="location"]')).toHaveText("Keeping it green");
  });

  test("fades while the wide photo row passes behind it", async ({ page }) => {
    const toc = page.locator("aside nav");
    await page.evaluate(() => scrollTo(0, 1600));
    await expect(toc).not.toHaveAttribute("inert");

    // Put the wide row level with the pinned nav.
    await page.locator("[data-wide]").evaluate((row) => scrollBy(0, row.getBoundingClientRect().top - 150));
    await expect(toc).toHaveAttribute("inert", "");
    await expect(toc).toHaveCSS("opacity", "0");

    await page.locator("[data-wide]").evaluate((row) => scrollBy(0, row.getBoundingClientRect().bottom + 200));
    await expect(toc).not.toHaveAttribute("inert");
  });
});
