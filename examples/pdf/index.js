const { chromium } = require("playwright");
const path = require("path");

/**
 * 访问网页生成pdf
 */
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://www.bilibili.com/", {
    waitUntil: "networkidle",
  });

  await page.pdf({
    path: path.resolve(__dirname, "test.pdf"),
    format: "letter",
  });

  await browser.close();
})();
