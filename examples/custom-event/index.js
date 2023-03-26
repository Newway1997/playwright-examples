const { chromium } = require("playwright");

/**
 * 暴露全局函数，触发事件执行案例
 */
(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Define a window.onCustomEvent function on the page.
  await page.exposeFunction("onCustomEvent", (e) => {
    console.log(`${e.type} fired`, e.detail || "");
  });

  /**
   * Attach an event listener to page to capture a custom event on page load/navigation.
   * @param {string} type Event name.
   * @returns {!Promise}
   */
  function listenFor(type) {
    return page.addInitScript((type) => {
      //不支持load事件
      document.addEventListener(type, (e) => {
        window.onCustomEvent({ type, detail: e.detail });
      });
    }, type);
  }

  await listenFor("click"); // Listen for "app-ready" custom event on page load.

  await page.goto("https://www.baidu.com/", {
    waitUntil: "networkidle",
  });

  await page.pause();
//   await browser.close();
})();
