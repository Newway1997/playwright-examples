const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const targetUrl = "http://www.maomijiaoyi.com";
const axios = require("axios");
/**
 * 图片下载案例
 */
async function saveFile(fileUrl) {
  const dir = path.resolve(__dirname, "./img");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let fileName = path.resolve(
    dir,
    new URL(fileUrl).pathname.split("/").slice(-1)[0]
  );
  if (!fs.existsSync(fileName)) {
    const res = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });
    if (res && res.data) {
      fs.writeFileSync(fileName, new Buffer.from(res.data), "binary");
      console.log("-->", fileName);
    }
  }
}
(async () => {
  const browserContext = await chromium.launch({
    headless: false,
    channel: "chrome",
    bypassCSP: true,
    devtools: true,
  });
  const page = await browserContext.newPage();
  await page.goto(targetUrl);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await Promise.all(
    (
      await page.$$("img")
    ).map(async (item) => {
      try {
        const src = await (await item.getProperty("src")).jsonValue();
        await saveFile(src.toString());
      } catch (e) {
        console.log(e);
      }
    })
  );
  await browserContext.close();
})();
