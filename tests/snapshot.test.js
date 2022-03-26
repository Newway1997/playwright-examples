const { test, expect } = require('@playwright/test');

test('my test', async ({ page }) => {
  await page.goto('https://juejin.cn/');

  // Compare screenshot with a stored reference.
  expect(await page.screenshot()).toMatchSnapshot('get-started.png');
});