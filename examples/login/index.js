const { chromium } = require("playwright");
const USERNAME = "Test";
const PASSWORD = "PASSWORD";
(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://github.com/login");

  // Interact with login form
  await page.fill('input[name="login"]', USERNAME);
  await page.fill('input[name="password"]', PASSWORD);
  await page.click("input[type=submit]");
})();
