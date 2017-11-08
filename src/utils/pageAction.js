// @flow
const Promise = require('bluebird');

const TIMEOUT = Number(process.env.TIMEOUT);

const pageAction /* : (Page, string[]) => Promise<void> */ = (page, actions) =>
  Promise.each(actions, async (action /* : string */) => {
    const [click, wait] = action.split(',');

    if (click) {
      await page.click(click);
    }
    if (wait) {
      await page.waitForSelector(wait, {
        timeout: TIMEOUT || 30000,
      });
    }
  });

module.exports = pageAction;
