import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
console.log("read config");
const config = defineConfig({
  globalSetup: require.resolve("./global-setup"),
  use: {
    channel: "chrome",
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    trace: "on-first-retry",
  },
  testDir: "tests",
  retries: 1,
});

module.exports = config;
