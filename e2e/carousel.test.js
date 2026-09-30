import { test, expect } from "@playwright/test";

// The evolution carousel on /rexan-sound-system. Paging must land on whole
// cards lined up with the text column; Safari doesn't re-snap after a smooth
// programmatic scroll, so this broke there while Chromium looked fine.

async function cardOffsets(page) {
  // Each card's left edge relative to the reading column's text edge, taken
  // from the "The evolution of Rexan" label, which sits in that column.
  const label = await page.getByText("The evolution of Rexan", { exact: true }).elementHandle();
  return page.evaluate((label) => {
    const carousel = document.querySelector('[aria-roledescription="carousel"]');
    const textEdge = label.getBoundingClientRect().left + parseFloat(getComputedStyle(label).paddingLeft);
    const track = carousel.querySelector("ul");
    return [...track.children].map((card) => {
      const offset = Math.round(card.getBoundingClientRect().left - textEdge);
      // Subpixel differences can round to -0 in Safari; alignment treats it as 0.
      return offset === 0 ? 0 : offset;
    });
  }, label);
}

// Clicks, then waits for the smooth scroll to start and then finish.
async function clickAndSettle(page, button) {
  const track = page.locator('[aria-roledescription="carousel"] ul');
  const before = await track.evaluate((el) => el.scrollLeft);
  await button.click();
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).not.toBe(before);
  let last;
  await expect
    .poll(async () => {
      const now = await track.evaluate((el) => el.scrollLeft);
      const settled = now === last;
      last = now;
      return settled;
    }, { intervals: [150] })
    .toBe(true);
}

function currentDot(page) {
  return page.locator('[aria-roledescription="carousel"] button[aria-current="true"]');
}

test.beforeEach(async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await page.getByRole("region", { name: "Rexan, year by year" }).scrollIntoViewIfNeeded();
});

test("starts on 2017, lined up with the text", async ({ page }) => {
  expect((await cardOffsets(page))[0]).toBe(0);
  await expect(currentDot(page)).toHaveAccessibleName("Show 2017");
  await expect(page.getByRole("button", { name: "Previous years" })).toBeDisabled();
});

test("next and previous land on whole cards", async ({ page }) => {
  const next = page.getByRole("button", { name: "Next years" });
  const prev = page.getByRole("button", { name: "Previous years" });

  await clickAndSettle(page, next);
  // Some card sits exactly on the text edge, not partway through one.
  await expect.poll(async () => (await cardOffsets(page)).some((x) => x === 0)).toBe(true);
  await expect(currentDot(page)).not.toHaveAccessibleName("Show 2017");

  while (await next.isEnabled()) await clickAndSettle(page, next);
  await expect(currentDot(page)).toHaveAccessibleName("Show 2026");
  // The last card is fully on screen.
  const lastCard = page.locator('[aria-roledescription="carousel"] li').last();
  await expect(lastCard).toBeInViewport({ ratio: 1 });

  while (await prev.isEnabled()) await clickAndSettle(page, prev);
  await expect.poll(async () => (await cardOffsets(page))[0]).toBe(0);
  await expect(currentDot(page)).toHaveAccessibleName("Show 2017");
});

test("dots jump to their year", async ({ page }) => {
  await page.getByRole("button", { name: "Show 2023" }).click();
  await expect(currentDot(page)).toHaveAccessibleName("Show 2023");
  await expect.poll(async () => (await cardOffsets(page))[4]).toBe(0);
});
