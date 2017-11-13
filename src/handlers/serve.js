const path = require('path');
const url = require('url');
const fs = require('fs-extra');
const mime = require('mime');
const sendError = require('../utils/sendError');

/**
 * TODO: serve middleware
 * ref: https://github.com/zeit/serve/issues/267
 */

const serve = async (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const isRoot = pathname === '/';
  const file = path.join(
    __dirname,
    '../../build',
    `./${isRoot ? 'index.html' : pathname}`,
  );

  try {
    await fs.pathExists(file);
    const data = await fs.readFile(file, { encoding: 'utf-8' });

    res.statusCode = 200;
    res.setHeader('Content-type', mime.getType(file));
    return res.end(data);
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = serve;
