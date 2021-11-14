const { test, expect } = require("@playwright/test");

test.describe("feature foo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.baidu.com/");
  });

  test("my test", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("https://www.baidu.com/");
  });
});
