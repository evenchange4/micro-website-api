// @flow
const R = require('ramda');

const getQuery /* : Object => Object */ = q => ({
  url: q.url,
  selector: q.selector,
  actions: R.cond([
    [R.isNil, R.always([])],
    [R.is(String), R.of],
    [R.is(Object), R.identity],
    [R.T, R.always([])],
  ])(q.actions),
  cache: R.complement(R.equals('false'))(q.cache),
  format: R.defaultTo('raw')(q.format),
});

module.exports = getQuery;
