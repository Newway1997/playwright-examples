const { chromium } = require("playwright");

/**
 * 访问翻译网站获取翻译结果案例
 */
const word = "你好";
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://fanyi.youdao.com/");

  // Type into search box.
  await page.type("#inputOriginal", word);

  await page.click(".transBtn", {
    force: true,
  });

  // Wait for suggest overlay to appear and click "show all results".
  const translateResultSelector = ".tgt span";
  await page.waitForSelector(translateResultSelector);

  // Extract the results from the page.
  const translateResult = await page.evaluate((translateResultSelector) => {
    return document.querySelector(translateResultSelector).textContent;
  }, translateResultSelector);

  console.log(translateResult);
  await browser.close();
})();
