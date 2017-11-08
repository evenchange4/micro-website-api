// @flow
const schema = require('../schema');

it('should return schema', () => {
  expect(schema).toMatchSnapshot();
});
