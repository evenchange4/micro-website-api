const { send } = require('micro');
const { router, get } = require('microrouter');
const puppeteer = require('puppeteer');

const handler = async (req, res) => {
  const { url, selector } = req.query;
  let browser;
  try {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 20,
      args: ['--no-sandbox'], // for docker
    });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.$eval(selector, el => el.innerHTML);
    send(res, 200, content);
  } catch (error) {
    console.log(error); //eslint-disable-line
    send(res, 400, error);
  }

  browser.close();
};

module.exports = router(get('/api', handler));
