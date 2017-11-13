// @flow
const R = require('ramda');
const { router, get } = require('microrouter');
const validation = require('micro-joi');
const cors = require('micro-cors');
const compress = require('micro-compress');
const schema = require('./utils/schema');
const serve = require('./handlers/serve');
const puppeteerHandler = require('./handlers/puppeteerHandler');

const middleware = R.compose(
  cors({
    allowMethods: ['GET', 'OPTIONS'],
    allowHeaders: [],
    origin: '*',
  }),
  validation(schema),
);

module.exports = router(
  get('/api', middleware(puppeteerHandler)),
  get('*', compress(serve)),
);
