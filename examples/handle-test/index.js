const { chromium } = require("playwright");
/**
 * 获取页面变量控制权案例
 */
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://www.baidu.com");
  const elementHandle = await page.waitForSelector("input[type=submit]");
  const boundingBox = await elementHandle.boundingBox();
  const classNames = await elementHandle.getAttribute("class");

  console.log(boundingBox);
  console.log(classNames);

  // Create new array in page.
  const myArrayHandle = await page.evaluateHandle(() => {
    window.myArray = [1];
    return myArray;
  });

  // Get the length of the array.
  const length = await page.evaluate((a) => a.length, myArrayHandle);
  console.log(length);

  // Add one more element to the array using the handle
  await page.evaluate((arg) => arg.myArray.push(arg.newElement), {
    myArray: myArrayHandle,
    newElement: 2,
  });

  console.log(await myArrayHandle.jsonValue())
  // Release the object when it's no longer needed.
  myArrayHandle.dispose();

  await page.close();
})();
