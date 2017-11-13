// @flow
const { send } = require('micro');
const puppeteer = require('puppeteer');
const memoryCache = require('memory-cache');
const himalaya = require('himalaya');
const pageAction = require('../utils/pageAction');
const getCacheKey = require('../utils/getCacheKey');
const getQuery = require('../utils/getQuery');
const sendError = require('../utils/sendError');

const TIMEOUT = Number(process.env.TIMEOUT);

const launch = () =>
  puppeteer.launch({
    // headless: false,
    // slowMo: 20,
    args: ['--no-sandbox'], // for docker
  });

// TODO: Shared global Chromium instance.
let browser;

const puppeteerHandler /* : Handler */ = async (req, res) => {
  const { url, selector, actions, cache, format } = getQuery(req.query);
  let page /* : Page|any */ = null;

  // 1. Resolve cache
  const cacheKey = getCacheKey({ url, selector, actions, format });
  const cacheContent = memoryCache.get(cacheKey);
  if (cache && cacheContent) {
    send(res, 200, cacheContent);
    return;
  }

  try {
    // 1. Puppeteer launch
    browser = browser || (await launch());
    page = await browser.newPage();
    await page.goto(url, { timeout: TIMEOUT, waitUntil: 'networkidle' });
    await pageAction(page, actions);
    // 2. Selector
    let content = await page.$eval(selector, el => el.innerHTML);
    if (format === 'json') content = himalaya.parse(content);
    // 3. Store cache
    memoryCache.put(cacheKey, content);

    send(res, 200, content);
  } catch (error) {
    sendError(res, error);
    // TODO: relaunch puppeteer
    if (error.message === 'not opened') browser = await launch();
  } finally {
    if (page.close) await page.close();
  }
};

module.exports = puppeteerHandler;
