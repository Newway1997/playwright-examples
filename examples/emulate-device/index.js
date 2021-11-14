const { chromium, devices } = require("playwright");
const path = require("path");
const iphone6 = devices["iPhone 6"];
/**
 * 模拟移动设备
 */
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    ...iphone6,
  });
  await page.goto("https://www.taobao.com/");
  await page.screenshot({ path: path.resolve(__dirname, "taobao.png") });
  const host = await page.evaluate(() => location.host);
  console.log(host); // 'm.facebook.com'
  browser.close();
})();
