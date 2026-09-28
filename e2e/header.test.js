import { test, expect } from "@playwright/test";

// The full logo scrolls away with the header; the compact flame lion takes
// over once it's gone, and stays out of reach (inert) while hidden.

const compact = (page) => page.getByRole("link", { name: "Sundowners home", includeHidden: true });

test("compact logo appears only after the header logo scrolls away", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await expect(compact(page)).toHaveAttribute("inert", "");
  await expect(compact(page)).toHaveCSS("opacity", "0");

  await page.evaluate(() => scrollTo(0, 800));
  await expect(compact(page)).not.toHaveAttribute("inert");
  await expect(compact(page)).toHaveCSS("opacity", "1");

  await page.evaluate(() => scrollTo(0, 0));
  await expect(compact(page)).toHaveAttribute("inert", "");
});

test("compact logo goes home", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await page.evaluate(() => scrollTo(0, 800));
  await compact(page).click();
  await expect(page).toHaveURL("/");
});

test("compact logo on the homepage returns to the top", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => scrollTo(0, 1500));
  await compact(page).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});
