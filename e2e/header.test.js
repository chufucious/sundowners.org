import { test, expect } from "@playwright/test";

// The full logo scrolls up with the header; as it slides off the top of the
// screen it hands over to the compact flame lion in step with the scroll,
// staggered: the full logo fades out first, then the compact one fades in.
// Whichever is mostly hidden stays out of reach (inert).

const compact = (page) => page.getByRole("link", { name: "Sundowners home", includeHidden: true });

const full = (page) => page.getByRole("link", { name: "sundowners logo", includeHidden: true });

// Scrolls the full logo `fraction` of its height off the top of the screen.
const scrollLogoOff = (page, fraction) =>
  full(page).evaluate((logo, fraction) => {
    const { top, height } = logo.getBoundingClientRect();
    scrollBy(0, top + height * fraction);
  }, fraction);

// Scrolls until the header (and its logo) is just out of view, or further.
const scrollPastHeader = (page, extra = 200) =>
  page.locator("main > header").evaluate((header, extra) => scrollTo(0, header.getBoundingClientRect().bottom + scrollY + extra), extra);

test("full and compact logos hand over with the scroll as the header logo leaves", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await expect(full(page)).toHaveCSS("opacity", "1");
  const opacity = (logo) => logo.evaluate((el) => Number(getComputedStyle(el).opacity));

  // A quarter off: the full logo is fading, the compact one hasn't started.
  await scrollLogoOff(page, 0.25);
  await expect.poll(() => opacity(full(page))).toBeLessThan(1);
  await expect.poll(() => opacity(full(page))).toBeGreaterThan(0);
  await expect.poll(() => opacity(compact(page))).toBe(0);
  await expect(full(page)).not.toHaveAttribute("inert");
  await expect(compact(page)).toHaveAttribute("inert", "");

  // Three quarters off: the full logo is gone, the compact one mostly in.
  await scrollLogoOff(page, 0.75);
  await expect.poll(() => opacity(full(page))).toBe(0);
  await expect.poll(() => opacity(compact(page))).toBeGreaterThan(0.5);
  await expect(full(page)).toHaveAttribute("inert", "");
  await expect(compact(page)).not.toHaveAttribute("inert");
});

test("compact logo appears only after the header logo scrolls away", async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await expect(compact(page)).toHaveAttribute("inert", "");
  await expect(compact(page)).toHaveCSS("opacity", "0");

  await scrollPastHeader(page);
  await expect(compact(page)).not.toHaveAttribute("inert");
  await expect(compact(page)).toHaveCSS("opacity", "1");

  await page.evaluate(() => scrollTo(0, 0));
  await expect(compact(page)).toHaveAttribute("inert", "");
  await expect(full(page)).toHaveCSS("opacity", "1");
  await expect(full(page)).not.toHaveAttribute("inert");
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
