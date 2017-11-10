// @flow
const Joi = require('joi');

const schema = Joi.object({
  query: Joi.object({
    url: Joi.string()
      .uri()
      .required(),
    selector: Joi.string().required(),

    actions: [Joi.string(), Joi.array().items(Joi.string())],
    cache: Joi.boolean().insensitive(),
    format: Joi.any().valid(['raw', 'json']),
  }),
});

module.exports = schema;
