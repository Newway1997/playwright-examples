const { expect } = require("@playwright/test");
//使用封装的test
const { test } = require("../test-wrapper.js");

test.describe("example", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.baidu.com/");
    });

    test("expect url is right", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("https://www.baidu.com/");
    });
});
