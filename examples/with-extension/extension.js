const { chromium } = require("playwright");
const { tmpdir } = require("os");
const path = require("path");
const fs = require("fs");

/**
 * 启动时加载chrome插件案例
 */
(async () => {
  //需设置本地安装的插件文件路径
  const pathToExtension =
    "C:/Users/Newway/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.4_1";
  const dir = await fs.promises.mkdtemp(path.join(tmpdir(), "user-data-dir-"));
  const browserContext = await chromium.launchPersistentContext(dir, {
    headless: false,
    channel: "chrome",
    bypassCSP: true,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });
  const page = await browserContext.newPage();
  await page.goto("https://www.google.com/");
  // Press Tab
  await page.press('[aria-label="搜索"]', "Tab");
  // Press Tab
  await page.press('[aria-label="按语音搜索"]', "Tab");
  // Press Tab
  await page.press(':nth-match(:text("Google 搜索"), 2)', "Tab");
  await page.pause();
})();
