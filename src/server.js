// @flow
const R = require('ramda');
const { router, get } = require('microrouter');
const validation = require('micro-joi');
const cors = require('micro-cors');
const compress = require('micro-compress');
const schema = require('./utils/schema');
const serve = require('./handlers/serve');
const puppeteerHandler = require('./handlers/puppeteerHandler');

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
    )(puppeteerHandler),
  ),
  get('*', compress(serve)),
);
