// @flow
const getCacheKey = require('../getCacheKey');

it('should return CacheKey', () => {
  expect(getCacheKey({ a: 1, b: 2, c: 3 })).toBe(`{"a":1,"b":2,"c":3}`);
  expect(getCacheKey({})).toBe(`{}`);
});
