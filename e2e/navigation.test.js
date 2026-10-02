import { test, expect } from "@playwright/test";

test("client navigation updates the hero and one set of social tags", async ({ page }) => {
  await page.goto("/");
  const documentStarted = await page.evaluate(() => performance.timeOrigin);
  const banner = "Sundowners walking in Black Rock City";
  const header = page.locator("main > header");
  const homeHeight = (await header.boundingBox()).height;
  const homeImage = await header.getByRole("img", { name: banner, exact: true }).evaluate((image) => image.src);

  async function checkPage({ path, title, description, image, type, hero = banner }) {
    await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(title);
    for (const [selector, content] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', `https://sundowners.org${path === "/" ? "" : path}`],
      ['meta[property="og:type"]', type],
      ['meta[property="og:image"]', image],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="twitter:image"]', image],
    ]) {
      const tag = page.locator(selector);
      await expect(tag).toHaveCount(1);
      await expect(tag).toHaveAttribute("content", content);
    }
    await expect(header.getByRole("img", { name: hero, exact: true })).toBeVisible();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    // A reload would hide stale layout state; this must stay in the same document.
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(documentStarted);
  }

  const home = {
    path: "/",
    title: "Sundowners – Black Rock City",
    description: /^Sundowners is a Burning Man camp/,
    image: "https://sundowners.org/og-image.jpg",
    type: "website",
  };
  await checkPage(home);
  await page.getByRole("link", { name: /Read Now\s*:\s*The Rexan Sound System/ }).click();
  await checkPage({
    path: "/rexan-sound-system",
    title: "The Rexan Sound System | Sundowners – Black Rock City",
    description: /^How we built a solar-powered QSC rig/,
    image: /^https:\/\/sundowners\.org\/.*hero-rexan-dusk.*\.jpe?g$/,
    type: "article",
    hero: "Rexan at dusk on the playa, headlight eyes glowing blue, speakers and lanterns on the top deck",
  });
  expect((await header.boundingBox()).height).toBeGreaterThan(page.viewportSize().height * 0.7);

  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await checkPage(home);
  await expect.poll(() => header.getByRole("img", { name: banner, exact: true }).evaluate((image) => image.src)).toBe(homeImage);
  expect((await header.boundingBox()).height).toBe(homeHeight);

  await page.getByRole("link", { name: /Read Now\s*:\s*Jagged Balls of Rolling Chaos/ }).click();
  await checkPage({
    path: "/jagged-balls-of-rolling-chaos",
    title: "Jagged Balls of Rolling Chaos | Sundowners – Black Rock City",
    description: /^Essential survival guide for Burning Man/,
    image: /^https:\/\/sundowners\.org\/.*jagged-balls-of-rolling-chaos.*\.png$/,
    type: "article",
  });
  await expect.poll(() => header.getByRole("img", { name: banner, exact: true }).evaluate((image) => image.src)).toBe(homeImage);
  const compactHeight = (await header.boundingBox()).height;
  if (page.viewportSize().width >= 768) expect(compactHeight).toBeLessThan(homeHeight);
  else expect(compactHeight).toBe(homeHeight);

  await header.getByRole("link", { name: "sundowners logo" }).click();
  await checkPage(home);
  expect((await header.boundingBox()).height).toBe(homeHeight);
});
