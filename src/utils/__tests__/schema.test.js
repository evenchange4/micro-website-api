// @flow
const Joi = require('joi');
const schema = require('../schema');

it('should return result', () => {
  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
        },
      },
      schema,
    ),
  ).toMatchSnapshot();

  expect(
    Joi.validate(
      {
        query: {
          url: '123',
          selector: 'selector',
        },
      },
      schema,
    ),
  ).toMatchSnapshot('invalid uri format');

  expect(
    Joi.validate(
      {
        query: {},
      },
      schema,
    ),
  ).toMatchSnapshot('required');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: true,
        },
      },
      schema,
    ),
  ).toMatchSnapshot('cache: true');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
        },
      },
      schema,
    ),
  ).toMatchSnapshot('cache: false');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
          actions: '123',
        },
      },
      schema,
    ),
  ).toMatchSnapshot('actions: string');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
          actions: ['123'],
        },
      },
      schema,
    ),
  ).toMatchSnapshot('actions: string[1]');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
          actions: ['123', '456'],
        },
      },
      schema,
    ),
  ).toMatchSnapshot('actions: string[2]');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
          actions: ['123', '456'],
          format: 'json',
        },
      },
      schema,
    ),
  ).toMatchSnapshot('json');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
          actions: ['123', '456'],
          format: 'raw',
        },
      },
      schema,
    ),
  ).toMatchSnapshot('raw');

  expect(
    Joi.validate(
      {
        query: {
          url: 'http://url.com',
          selector: 'selector',
          cache: false,
          actions: ['123', '456'],
          format: 'not support',
        },
      },
      schema,
    ),
  ).toMatchSnapshot('not support');
});
