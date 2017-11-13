const { send } = require('micro');

const sendError = (res, error) => {
  console.log({ error }); //eslint-disable-line
  return send(res, 400, {
    message: error.message,
    name: error.message,
    statusCode: 400,
  });
};

module.exports = sendError;
