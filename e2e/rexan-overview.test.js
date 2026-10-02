import { test, expect } from "@playwright/test";

const years = ["2017", "2018", "2019", "2022", "2023", "2025", "2026"];

async function openOverview(page) {
  await page.goto("/");
  const overview = page.getByRole("region", { name: "Rexan, year by year", exact: true });
  await overview.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await expect(overview.locator("li > p")).toHaveText(years);
  return overview;
}

async function expectPageToFit(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    left: scrollX,
  }));
  expect(dimensions.width).toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.left).toBe(0);
}

for (const width of [320, 390]) {
  test(`homepage Rexan overview scrolls independently at ${width}px`, async ({ page, isMobile }) => {
    await page.setViewportSize({ width, height: 844 });
    const overview = await openOverview(page);
    const first = overview.getByText("2017", { exact: true });
    const last = overview.getByText("2026", { exact: true });
    const hint = page.getByText("Swipe for all the years →", { exact: true });
    await expect(first).toBeInViewport({ ratio: 1 });
    await expect(last).not.toBeInViewport();
    await expect(hint).toBeVisible();
    await expectPageToFit(page);

    if (isMobile) {
      // Playwright mobile WebKit has no mouse wheel or native swipe API.
      await last.scrollIntoViewIfNeeded();
    } else {
      const box = await overview.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(1000, 0);
    }
    await expect.poll(() => overview.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    await expect(last).toBeInViewport({ ratio: 1 });
    await expect(first).not.toBeInViewport();
    await expect(hint).toBeVisible();
    await expectPageToFit(page);
  });
}

test("homepage Rexan overview shows every year on desktop", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop overview");
  await page.setViewportSize({ width: 1280, height: 900 });
  const overview = await openOverview(page);
  for (const year of years) await expect(overview.getByText(year, { exact: true })).toBeInViewport({ ratio: 1 });
  await expect(page.getByText("Swipe for all the years →", { exact: true })).toBeHidden();
  expect(await overview.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await expectPageToFit(page);
});

test("homepage Rexan evolution link opens its article", async ({ page }) => {
  await openOverview(page);
  await page.getByRole("link", { name: "Read about Rexan's Evolution", exact: true }).click();
  await expect(page).toHaveURL("/rexan-sound-system");
  await expect(page).toHaveTitle("The Rexan Sound System | Sundowners – Black Rock City");
  await expect(page.getByRole("region", { name: "Rexan, year by year", exact: true })).toHaveAttribute("aria-roledescription", "carousel");
});
