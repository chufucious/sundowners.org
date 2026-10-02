import { test, expect } from "@playwright/test";
import { currentYear, expeditions } from "../src/lib/expeditions.js";

// "Curiouser & Curiouser" -> "curiouser-curiouser", matching burningman.org's URL slugs.
const slug = (theme) => theme.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

test("expedition data is newest first and every link is for its own year", () => {
  const years = expeditions.map((e) => e.year);
  expect(years[0]).toBe(currentYear);
  expect(years).toEqual([...new Set(years)].sort((a, b) => b - a));

  for (const { year, theme, url } of expeditions) {
    // A copy-pasted row would carry another year's archive or theme page.
    expect(url, `${year} ${theme}`).toMatch(/^https:\/\//);
    expect(url.includes(String(year)) || url.includes(slug(theme)), `${year} ${theme}: ${url}`).toBe(true);
  }
});

test("each row of the expeditions table links its theme to that year's page", async ({ page }) => {
  await page.goto("/");
  const rows = page.getByRole("table", { name: "EXPEDITIONS" }).getByRole("row");
  await expect(rows).toHaveCount(expeditions.length);

  for (const [i, { year, theme, address, url }] of expeditions.entries()) {
    const row = rows.nth(i);
    await expect(row.getByRole("cell").first()).toHaveText(String(year));
    await expect(row.getByRole("cell").last()).toHaveText(address);
    await expect(row.getByRole("link")).toHaveCount(1);
    await expect(row.getByRole("link", { name: theme, exact: true })).toHaveAttribute("href", url);
  }
});
