const { chromium } = require("playwright");
/**
 * 获取性能指标
 */
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  await page.goto("http://www.baidu.com");

  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );
  console.log("performanceTiming", performanceTiming);

  await navigationPromise;

  const firstPaint = JSON.parse(
    await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByName("first-paint"))
    )
  );

  const firstContentfulPaint = JSON.parse(
    await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByName("first-contentful-paint"))
    )
  );
  console.log(`First paint: ${firstPaint[0].startTime}`);
  console.log(`First Contentful paint: ${firstContentfulPaint[0].startTime}`);
  await browser.close();
})();
