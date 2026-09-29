import { test, expect } from "@playwright/test";

// The full logo scrolls away with the header; the compact flame lion takes
// over once it's gone, and stays out of reach (inert) while hidden.

const compact = (page) => page.getByRole("link", { name: "Sundowners home", includeHidden: true });

// Scrolls until the header (and its logo) is just out of view, or further.
const scrollPastHeader = (page, extra = 200) =>
  page.locator("main > header").evaluate((header, extra) => scrollTo(0, header.getBoundingClientRect().bottom + scrollY + extra), extra);

test("compact logo appears only after the header logo scrolls away", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await expect(compact(page)).toHaveAttribute("inert", "");
  await expect(compact(page)).toHaveCSS("opacity", "0");

  await scrollPastHeader(page);
  await expect(compact(page)).not.toHaveAttribute("inert");
  await expect(compact(page)).toHaveCSS("opacity", "1");

  await page.evaluate(() => scrollTo(0, 0));
  await expect(compact(page)).toHaveAttribute("inert", "");
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
