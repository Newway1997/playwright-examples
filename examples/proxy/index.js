const { chromium } = require("playwright");
/**
 * 所有请求发送到代理服务器
 */
(async () => {
  const browser = await chromium.launch({
    headless: false,
    proxy: {
      server: "http://myproxy.com:3128",
      username: "usr",
      password: "pwd",
    },
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://google.com");
  await browser.close();
})();
