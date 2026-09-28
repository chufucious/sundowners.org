import { test, expect } from "@playwright/test";

// From md up the table of contents is pinned in a left rail; phones hide it.

test("phones hide it", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone layout");
  await page.goto("/rexan-sound-system");
  await expect(page.getByRole("navigation", { name: "On this page", includeHidden: true })).toBeHidden();
});

test.describe("left rail", () => {
  // Roughly a laptop browser window that isn't full screen.
  test.use({ viewport: { width: 1000, height: 800 } });
  test.skip(({ isMobile }) => isMobile, "desktop layout");

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

  test("stays pinned on the left, clear of the text, while the post scrolls", async ({ page }) => {
    const toc = page.getByRole("navigation", { name: "On this page" });
    for (const id of ["the-rig-today", "what-broke", "thanks"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(toc).toBeInViewport();
      const nav = await toc.boundingBox();
      const text = await page.locator(`#${id}`).boundingBox();
      expect(nav.x + nav.width).toBeLessThan(text.x);
    }
  });
});
