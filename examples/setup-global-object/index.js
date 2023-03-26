const { chromium } = require("playwright");
const path = require("path");
/**
 * 在初始化时设置全局对象
 */
(async function () {
  //桌面应用标记设为true，表示内嵌的chromium
  global.isDesktopApplication = true;
  const browser = await chromium.connectOverCDP("http://localhost:9222");
  const contexts = await browser.contexts();
  //打开新的tab
  const pages = await contexts[0].pages();

  const page = pages.find(async (page) => {
    return (await page.title()) !== "DevTools";
  });

  await page.addInitScript(() => {
    window.go = function () {
      console.log("hello");
    };
  });
  await page.goto("http://www.bilibili.com");

  await page.screenshot({ path: path.resolve(__dirname, "screenshot.png") });
  await page.pause();
})();
