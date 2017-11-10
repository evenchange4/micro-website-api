const path = require('path');
const url = require('url');
const fs = require('fs-extra');
const { send } = require('micro');

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
    return send(res, 200, data);
  } catch (error) {
    console.log({ error }); //eslint-disable-line
    return send(res, 400, {
      message: error.message,
      name: error.message,
      statusCode: 400,
    });
  }
};

module.exports = serve;
