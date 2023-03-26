const fs = require("fs");
const { chromium } = require("playwright");
const path = require("path");
const DEFAULT_TXT =
  "Hello there, my name is Puppeteer. I am controlling your browser.";
/**
 * 朗读案例
 */
(async () => {
  const browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    bypassCSP: true,
    args: [
      "--window-size=0,0", // Launch baby window for fun.
      "--window-position=0,0",
      "--enable-speech-dispatcher", // Needed for Linux?
    ],
  });
  const page = await browser.newPage();

  // Clever way to "communicate with page". Know when speech is done.
  page.on("console", async (msg) => {
    if (msg.text() === "SPEECH_DONE") {
      await browser.close();
    }
  });

  const flagIdx = process.argv.findIndex((item) => item === "-t");
  const text =
    flagIdx === -1 ? DEFAULT_TXT : process.argv.slice(flagIdx + 1).join(" ");

  await page.addInitScript((text) => (window.TEXT2SPEECH = text), text);

  const html = fs.readFileSync(path.resolve(__dirname, "./speech_synth.html"), {
    encoding: "utf-8",
  });
  // Cause a navigation so the evaluateOnNewDocument kicks in.
  await page.goto(`data:text/html,${html}`);

  await page.click("button");
})();
