const base = require("@playwright/test");
const { chromium } = require("playwright");

exports.test = base.test.extend({
    page: async ({}, use) => {
        //桌面应用标记设为true，表示内嵌的chromium
        global.isDesktopApplication = true;
        const browser = await chromium.connectOverCDP("http://localhost:8080");
        const contexts = await browser.contexts();
        const pages = await contexts[0].pages();

        const page = pages.find(async (page) => {
            return (await page.title()) !== "DevTools";
        });
        await use(page);
    },
});
