const { send, createError } = require('micro');
const { router, get } = require('microrouter');
const Promise = require('bluebird');
const puppeteer = require('puppeteer');
const memoryCache = require('memory-cache');

const handler = async (req, res) => {
  let browser;

  try {
    // 1. Parameter check
    const { url, selector, actions } = req.query;
    if (!url) throw createError(400, `query parameter 'url' is required.`);
    if (!selector) {
      throw createError(400, `query parameter 'selector' is required.`);
    }

    // Resolve cache
    const cache = req.query.cache !== 'false';
    const cacheKey = req.url
      .replace('&cache=false', '')
      .replace('&cache=true', ''); // TODO: cacheKey
    const cacheContent = memoryCache.get(cacheKey);
    if (cache && cacheContent) {
      return send(res, 200, cacheContent);
    }

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 20,
      args: ['--no-sandbox'], // for docker
    });
    const page = await browser.newPage();

    // 2. Goto
    await page.goto(url, {
      timeout: 9999999,
      // waitUntil: 'networkidle',
    });

    // 3. Action
    if (actions) {
      await Promise.each(
        typeof actions === 'string' ? Array.of(actions) : actions,
        async action => {
          const [click, wait] = action.split(',');
          if (click) {
            await page.click(click);
          }
          if (wait) {
            await page.waitForSelector(wait, {
              timeout: 9999999,
            });
          }
        },
      );
    }

    // 4. Selector
    const content = await page.$eval(selector, el => el.innerHTML);

    // Store cache
    if (cache) {
      memoryCache.put(cacheKey, content);
    } else {
      memoryCache.del(cacheKey);
    }

    send(res, 200, content);
  } catch (error) {
    console.log(error); //eslint-disable-line
    send(res, 400, error);
  }

  return browser.close();
};

module.exports = router(get('/api', handler));
