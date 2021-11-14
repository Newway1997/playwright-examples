const { chromium } = require("playwright");
const path = require("path");

/**
 * 拦截请求案例，拦截图片请求
 */
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route("**/*", (route) => {
    return route.request().resourceType() === "image"
      ? route.abort()
      : route.continue();
  });
  await page.goto("https://news.google.com/news/");
  await page.screenshot({
    path: path.resolve(__dirname, "./news.png"),
    fullPage: true,
  });

  await browser.close();
})();
