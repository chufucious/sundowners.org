import { test, expect } from "@playwright/test";

// Wide screens have a pinned contents rail; the article keeps the page's center.

test("phones hide it", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone layout");
  await page.goto("/rexan-sound-system");
  await expect(page.getByRole("navigation", { name: "On this page", includeHidden: true })).toBeHidden();
});

test.describe("left rail", () => {
  test.use({ viewport: { width: 1600, height: 800 } });
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

  test("body text stays in the reading column", async ({ page }) => {
    // Measure 65ch in the rendered body font; gutters sit outside the prose.
    const { width, measure } = await page.getByText("Early on we powered the lights").evaluate((p) => {
      const probe = document.createElement("span");
      probe.style.cssText = "display:block;position:absolute;width:65ch;height:0;visibility:hidden";
      p.append(probe);
      const measure = probe.getBoundingClientRect().width;
      probe.remove();
      return { width: p.getBoundingClientRect().width, measure };
    });
    expect(width).toBeCloseTo(measure, 0);
  });

  test("stays pinned on the left, clear of the text, while the post scrolls", async ({ page }) => {
    const toc = page.getByRole("navigation", { name: "On this page" });
    for (const id of ["the-rig-today", "bumps-in-the-road", "thanks"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(toc).toBeInViewport();
      const nav = await toc.boundingBox();
      const text = await page.locator(`#${id}`).boundingBox();
      expect(nav.x + nav.width).toBeLessThan(text.x);
    }
  });
});

test("title, body, photos and carousel share the page center", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop and tablet layout");
  for (const width of [768, 1023, 1024, 1280, 1366, 1440, 1600, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/rexan-sound-system");
    await page.evaluate(() => document.fonts.ready);
    const centered = [
      page.locator("article > header"),
      page.locator("article .prose").first(),
      page.locator("article figure").first().locator(".."),
      page.getByRole("region", { name: "Rexan, year by year" }),
    ];
    for (const element of centered) {
      const box = await element.boundingBox();
      expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThanOrEqual(1);
    }
    const toc = page.getByRole("navigation", { name: "On this page", includeHidden: true });
    if (width < 1024) {
      await expect(toc).toBeHidden();
    } else {
      await centered[1].scrollIntoViewIfNeeded();
      await expect(toc).toBeInViewport();
      const nav = await toc.boundingBox();
      const text = await centered[1].boundingBox();
      expect(nav.x + nav.width).toBeLessThan(text.x);
      await page.locator("#thanks").scrollIntoViewIfNeeded();
      await expect(toc).toBeInViewport();
    }
  }
});
