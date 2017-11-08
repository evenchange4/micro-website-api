// @flow
const getQuery = require('../getQuery');

it('should return query with required parameters', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
    }),
  ).toEqual({
    actions: [],
    cache: true,
    format: 'raw',
    selector: '#id',
    url: 'http://example.com',
  });
});

it('should return query with cache: "false"', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
      cache: 'false',
    }),
  ).toEqual({
    actions: [],
    cache: false,
    format: 'raw',
    selector: '#id',
    url: 'http://example.com',
  });
});

it('should return query with cache: "true"', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
      cache: 'true',
    }),
  ).toEqual({
    actions: [],
    cache: true,
    format: 'raw',
    selector: '#id',
    url: 'http://example.com',
  });
});

it('should return query with format: "json"', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
      format: 'json',
    }),
  ).toEqual({
    actions: [],
    cache: true,
    format: 'json',
    selector: '#id',
    url: 'http://example.com',
  });
});

it('should return query with format: "raw"', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
      format: 'raw',
    }),
  ).toEqual({
    actions: [],
    cache: true,
    format: 'raw',
    selector: '#id',
    url: 'http://example.com',
  });
});

it('should return query with one action', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
      actions: 'action1',
    }),
  ).toEqual({
    actions: ['action1'],
    cache: true,
    format: 'raw',
    selector: '#id',
    url: 'http://example.com',
  });
});

it('should return query with two actions', () => {
  expect(
    getQuery({
      url: 'http://example.com',
      selector: '#id',
      actions: ['action1', 'action2'],
    }),
  ).toEqual({
    actions: ['action1', 'action2'],
    cache: true,
    format: 'raw',
    selector: '#id',
    url: 'http://example.com',
  });
});
