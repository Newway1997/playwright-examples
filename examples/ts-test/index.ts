import {Browser} from "@playwright/test";

import {chromium} from "playwright";
import path from "path";

/**
 * attach模式，在现有浏览器中进行测试的案例
 */
(async function () {
  //CDP协议连接进行调试，详情见https://juejin.cn/post/7012853971362512933
  //配置参数--remote-debugging-port=9222
  const browser = await getBrowser();
  const page = await getPage(browser);
  //打开新的tab
  await page.goto("http://www.baidu.com");
  await page.screenshot({path: path.resolve(__dirname, "screenshot.png")});
  await browser.close();
})();

async function getBrowser(): Promise<Browser> {
  return await chromium.connectOverCDP("http://127.0.0.1:9222");
}

async function getPage(browser: Browser) {
  const contexts = browser.contexts();
  return await contexts[0].newPage();
}
