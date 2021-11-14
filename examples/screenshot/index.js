const { chromium, devices } = require("playwright");
const path = require("path");

/**
 * 截图案例，全屏，元素
 */
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    ...devices["iPhone 11"],
  });
  await page.goto("https://m.bilibili.com/");
  //全屏
  await page.screenshot({
    path: path.resolve(__dirname, "full.png"),
    fullPage: true,
  });

  //截取某个元素
  const elementHandle = await page.$(".logo");
  await elementHandle.screenshot({
    path: path.resolve(__dirname, "logo.png"),
  });

  await browser.close();
})();
