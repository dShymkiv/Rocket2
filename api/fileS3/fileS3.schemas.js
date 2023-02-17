const Joi = require('joi');

const getPrivateFileSchema = {
  query: Joi.object().keys({
    url: Joi.string().trim().required().error(new Error("'url' is not required")),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(256).error(new Error("Invalid token")),
  }).unknown(),
};

module.exports = {
  getPrivateFileSchema
};
