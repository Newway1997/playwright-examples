const { chromium } = require("playwright");
const path = require("path");

/**
 * 录制视频
 */
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: path.resolve(__dirname, "videos/"),
      size: { width: 640, height: 480 },
    },
  });
  const page = await context.newPage();
  await page.goto("https://bilibili.com/");
  const savePath = await page.video().path();
  console.log(savePath);
  // Make sure to await close, so that videos are saved.
  await context.close();
})();
