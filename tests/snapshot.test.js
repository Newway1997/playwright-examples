const { test, expect } = require("@playwright/test");

test("snapshot", async ({ page }) => {
    await page.goto("https://www.baidu.com/");

    // Compare screenshot with a stored reference.
    expect(await page.screenshot()).toMatchSnapshot("get-started.png");
});
