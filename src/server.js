// @flow
const { send } = require('micro');
const R = require('ramda');
const { router, get } = require('microrouter');
const puppeteer = require('puppeteer');
const memoryCache = require('memory-cache');
const validation = require('micro-joi');
const himalaya = require('himalaya');
const cors = require('micro-cors');
const compress = require('micro-compress');
const pageAction = require('./utils/pageAction');
const getCacheKey = require('./utils/getCacheKey');
const schema = require('./utils/schema');
const getQuery = require('./utils/getQuery');
const serve = require('./utils/serve');

const TIMEOUT = Number(process.env.TIMEOUT);

const handler /* : Handler */ = async (req, res) => {
  const { url, selector, actions, cache, format } = getQuery(req.query);
  let browser;

  // 1. Resolve cache
  const cacheKey = getCacheKey({ url, selector, actions, format });
  const cacheContent = memoryCache.get(cacheKey);
  if (cache && cacheContent) return send(res, 200, cacheContent);

  try {
    // 2. Puppeteer
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 20,
      args: ['--no-sandbox'], // for docker
    });
    const page /* : Page */ = await browser.newPage();
    // await page.setViewport({
    //   width: 1400,
    //   height: 800,
    // })

    // 3. Goto
    await page.goto(url, {
      timeout: TIMEOUT,
      waitUntil: 'networkidle',
    });

    // 4. Actions
    if (actions) {
      await pageAction(page, actions);
    }

    // 5. Selector
    let content = await page.$eval(selector, el => el.innerHTML);
    if (format === 'json') {
      content = himalaya.parse(content);
    }

    // 6. Store cache
    if (cache) {
      memoryCache.put(cacheKey, content);
    } else {
      memoryCache.del(cacheKey);
    }

    send(res, 200, content);
  } catch (error) {
    console.log({ error }); //eslint-disable-line
    send(res, 400, {
      message: error.message,
      name: error.message,
      statusCode: 400,
    });
  }

  return browser && browser.close();
};

module.exports = router(
  get(
    '/api',
    R.compose(
      cors({
        allowMethods: ['GET', 'OPTIONS'],
        allowHeaders: [],
        origin: '*',
      }),
      validation(schema),
    )(handler),
  ),
  get('*', compress(serve)),
);
