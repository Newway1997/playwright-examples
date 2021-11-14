console.log("read config");
const config = {
  globalSetup: require.resolve("./global-setup"),
  use: {
    channel: "chrome",
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  },
  testDir: "tests",
  retries: 1,
  use: {
    trace: "on-first-retry",
  },
};

module.exports = config;
