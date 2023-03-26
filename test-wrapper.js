const base = require("@playwright/test");
const { chromium } = require("playwright");
//封装test
exports.test = base.test.extend({
    //封装page对象，通过cdp attach chrome获取page对象
    page: async ({}, use) => {
        //桌面应用标记设为true，表示内嵌的chromium
        global.isDesktopApplication = true;
        const browser = await chromium.connectOverCDP("http://localhost:9222");
        const contexts = await browser.contexts();
        const pages = await contexts[0].pages();

        const page = pages.find(async (page) => {
            return (await page.title()) !== "DevTools";
        });
        await use(page);
    },
});
