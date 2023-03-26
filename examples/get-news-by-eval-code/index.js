const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
/**
 * 通过执行注入的js代码爬取新闻
 */
(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  console.log(await browser.version());

  await page.goto("https://top.baidu.com/board");

  // Extract articles from the page.
  const resultsSelector = ".theme-hot a";
  const links = await page.evaluate((resultsSelector) => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors
      .map((anchor) => {
        const item = anchor.querySelector(".c-single-text-ellipsis");
        if (item) {
          const title = item.textContent;
          return `${title} - ${anchor.href}`;
        }
        return;
      })
      .filter(Boolean);
  }, resultsSelector);
  fs.writeFileSync(path.resolve(__dirname, "news.txt"), links.join("\n"));
  await browser.close();
})();
