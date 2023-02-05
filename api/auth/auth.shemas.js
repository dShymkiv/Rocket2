const Joi = require('joi');

const regExp = require('../../configs/enums/regexp.enum');

const loginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().regex(regExp.EMAIL).lowercase().trim().error(new Error("'email' is not valid")),
    password: Joi.string().regex(regExp.PASSWORD).error(new Error("Please enter valid data")),
  }).required(),
};

const headersSchema = {
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(256).error(new Error("Invalid token")),
  }).unknown(),
};

const forgotPasswordSchema = {
  body: Joi.object().keys({
    email: Joi.string().regex(regExp.EMAIL).lowercase().trim().error(new Error("'email' is not valid")),
  }).required(),
};

const setNewPasswordSchema = {
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(256).error(new Error("Invalid token")),
  }).unknown(),
  body: Joi.object().keys({
    password: Joi.string().regex(regExp.PASSWORD).error(new Error("Please enter valid data")),
  }).required(),
};

module.exports = {
  loginUserSchema,
  headersSchema,
  forgotPasswordSchema,
  setNewPasswordSchema
};
