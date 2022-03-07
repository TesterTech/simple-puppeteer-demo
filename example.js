'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
    {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], //https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
        headless : false //change to false if running in pipeline (default is also false, btw)
      }
  );
  const page = await browser.newPage();

  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    browser.close();
  });

  await page.goto('https://google.com', {
    waitUntil: 'domcontentloaded',
  });
  const hrefElement = await page.$('asfffda'); // clicking any link for the demo
  await hrefElement.click();

  var output = await page.evaluate(() => {
    return;
  });

  await browser.close();
})();