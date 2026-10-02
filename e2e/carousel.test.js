import { test, expect } from "@playwright/test";

// The evolution carousel on /rexan-sound-system. Paging must land on whole
// cards lined up with the text column; Safari doesn't re-snap after a smooth
// programmatic scroll, so this broke there while Chromium looked fine.

async function cardOffsets(page) {
  // Each card's left edge relative to the article body's reading edge.
  const body = await page.getByText("And Rexan's heart is our community, and its voice is its sound system.", { exact: true }).elementHandle();
  return page.evaluate((body) => {
    const carousel = document.querySelector('[aria-roledescription="carousel"]');
    const textEdge = body.getBoundingClientRect().left;
    const track = carousel.querySelector("ul");
    return [...track.children].map((card) => {
      const offset = Math.round(card.getBoundingClientRect().left - textEdge);
      // Subpixel differences can round to -0 in Safari; alignment treats it as 0.
      return offset === 0 ? 0 : offset;
    });
  }, body);
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

test.beforeEach(async ({ page }) => {
  await page.goto("/rexan-sound-system");
  await page.getByRole("region", { name: "Rexan, year by year" }).scrollIntoViewIfNeeded();
  // Client modules must be ready before activating the controls.
  await page.waitForLoadState("networkidle");
});

test("starts on 2017, lined up with the text", async ({ page }) => {
  expect((await cardOffsets(page))[0]).toBe(0);
  const body = await page.getByText("And Rexan's heart is our community, and its voice is its sound system.", { exact: true }).boundingBox();
  const logo = await page.getByRole("img", { name: "Rexan", exact: true }).boundingBox();
  const first = await page.locator('[aria-roledescription="carousel"] li').first().boundingBox();
  expect(logo.x).toBeCloseTo(body.x, 0);
  expect(first.x).toBeCloseTo(body.x, 0);
  const carousel = page.getByRole("region", { name: "Rexan, year by year", exact: true });
  await expect(carousel.getByRole("button")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "Previous years" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Next years" })).toBeEnabled();
  expect(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) <= document.documentElement.clientWidth + 1)).toBe(true);
});

test("arrows advance one year at a time and stop at the ends", async ({ page }) => {
  const next = page.getByRole("button", { name: "Next years" });
  const prev = page.getByRole("button", { name: "Previous years" });

  for (let i = 1; i < 7; i++) {
    await clickAndSettle(page, next);
    await expect.poll(async () => (await cardOffsets(page))[i]).toBe(0);
    await expect(prev).toBeEnabled();
  }
  await expect(next).toBeDisabled();
  // The last card is fully on screen.
  const lastCard = page.locator('[aria-roledescription="carousel"] li').last();
  await expect(lastCard).toBeInViewport({ ratio: 1 });

  for (let i = 5; i >= 0; i--) {
    await clickAndSettle(page, prev);
    await expect.poll(async () => (await cardOffsets(page))[i]).toBe(0);
  }
  await expect.poll(async () => (await cardOffsets(page))[0]).toBe(0);
  await expect(prev).toBeDisabled();
});
