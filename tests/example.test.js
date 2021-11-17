const { expect } = require("@playwright/test");
const { test } = require("../test.js");

test.describe("feature foo", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.bilibili.com/");
    });

    test("my test", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("https://www.baidu.com/");
    });
});
