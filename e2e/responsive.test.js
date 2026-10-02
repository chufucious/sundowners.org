import { test, expect } from "@playwright/test";

const routes = ["/", "/rexan-sound-system", "/jagged-balls-of-rolling-chaos"];

async function expectPageToFit(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    left: scrollX,
  }));
  expect(dimensions.width).toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.left).toBe(0);
}

for (const width of [320, 390, 767]) {
  test(`pages fit at ${width}px while galleries scroll independently`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await test.step(route, async () => {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        await expectPageToFit(page);
        await page.locator("main > footer").scrollIntoViewIfNeeded();
        // The scroll-linked logo confirms hydration has installed the handlers
        // before we try the gallery controls on slower mobile browsers.
        await expect(page.getByRole("link", { name: "Sundowners home", exact: true })).toBeVisible();
        await expectPageToFit(page);

        if (route === "/" || route === "/rexan-sound-system") {
          const track = page.locator(route === "/" ? "#gallery" : '[aria-roledescription="carousel"] ul');
          const next = page.getByRole("button", { name: route === "/" ? "more photos →" : "Next years", exact: true });
          await next.click();
          await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
          await expectPageToFit(page);
        }
      });
    }
  });
}
