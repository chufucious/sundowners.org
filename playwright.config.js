import { defineConfig, devices } from "@playwright/test";

// Runs against the production build: dev mode hid a Safari-only carousel bug.
// WebKit stands in for mobile Safari, the browser this site is checked on.
// Tests tagged @external visit other sites; they only run with EXTERNAL=1
// (`bun run test:links`), which skips building and serving this one.
const external = !!process.env.EXTERNAL;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:4173" },
  grep: external ? /@external/ : undefined,
  grepInvert: external ? undefined : /@external/,
  webServer: external
    ? undefined
    : {
        command: "bun run build && bun run preview --port 4173",
        url: "http://localhost:4173",
        reuseExistingServer: !process.env.CI,
        timeout: 300_000,
      },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "desktop-safari", use: { ...devices["Desktop Safari"] } },
    { name: "iphone", use: { ...devices["iPhone 13"] } },
    // Device-specific safe-area regressions; broader site tests stay above.
    { name: "android", testMatch: "**/safe-area.test.js", use: { ...devices["Pixel 5"] } },
    { name: "tablet-portrait", testMatch: "**/safe-area.test.js", use: { ...devices["iPad Pro 11"] } },
    { name: "tablet-landscape", testMatch: "**/safe-area.test.js", use: { ...devices["iPad Pro 11 landscape"] } },
  ],
});
