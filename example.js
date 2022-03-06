'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
    {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless : true
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

  var output = await page.evaluate(() => {
    return;
  });

  await browser.close();
})();
