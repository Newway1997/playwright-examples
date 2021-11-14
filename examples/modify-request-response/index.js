const { chromium } = require("playwright");
/**
 * 修改请求和响应
 */
(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.route("**/*", async (route) => {
    // Fetch original response.
    const response = await page.request.fetch(route.request());
    // Add a prefix to the title.
    if (response.headers()["content-type"].match("text/html")) {
      console.log(route.request().url());
      let body = await response.text();
      body = body.replace("<title>", "<title>My prefix:");
      route.fulfill({
        // Pass all fields from the response.
        response,
        // Override response body.
        body,
        // Force content type to be html.
        headers: {
          ...response.headers(),
        },
      });
    } else {
      route.continue();
    }
  });
  await page.goto("http://www.baidu.com");

  // Delete header
  await page.route("**/*", (route) => {
    const headers = route.request().allHeaders();
    delete headers["X-Secret"];
    route.continue({ headers });
  });
  await page.goto("http://www.taobao.com");
  await page.close();
})();
