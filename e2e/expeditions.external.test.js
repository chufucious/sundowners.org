import { test, expect } from "@playwright/test";
import { expeditions } from "../src/lib/expeditions.js";

// Visits burningman.org, so it's left out of the default run (see playwright.config.js):
// a slow or unreachable third-party site shouldn't fail everyday test runs.
// Run it now and then with `bun run test:links`.

// "Curiouser & Curiouser" also matches "Curiouser and Curiouser", "I, Robot" matches "I Robot".
const mention = (theme) =>
  new RegExp(theme.split(/[^A-Za-z0-9]+/).filter(Boolean).join("[\\s,&:]*(?:and\\s+)?"), "i");

test.describe("expedition links", { tag: "@external" }, () => {
  test.describe.configure({ mode: "parallel" });

  for (const { year, theme, url } of expeditions) {
    test(`${year} ${theme} still leads to its theme page`, async ({ page }) => {
      const response = await page.goto(url, { waitUntil: "domcontentloaded" });
      expect(response?.status(), url).toBeLessThan(400);
      await expect(page.locator("body")).toContainText(mention(theme), { timeout: 15_000 });
    });
  }
});
