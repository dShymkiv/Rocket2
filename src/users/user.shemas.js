const Joi = require('joi');

const regExp = require('../../configs/regexp.enum');

const createUserSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'firstName' is not valid")),
    lastName: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'lastName' is not valid")),
    age: Joi.number().integer().min(1).max(120).error(new Error("'age' is not valid")),
    role: Joi.string().valid('user'),

    email: Joi.string().regex(regExp.EMAIL).lowercase().trim().required().error(new Error("'email' is not valid")),
    password: Joi.string().regex(regExp.PASSWORD).required().error(new Error("Please enter valid data")),
  })
};

const updateUserSchema = {
  params: Joi.object()
    .keys({
      userId: Joi.string().alphanum().required(),
    })
    .required(),

  body: Joi.object().keys({
    firstName: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'firstName' is not valid")),
    lastName: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'lastName' is not valid")),
    age: Joi.number().integer().min(1).max(120).error(new Error("'age' is not valid")),

    email: Joi.string().regex(regExp.EMAIL).lowercase().trim().error(new Error("'email' is not valid")),
    password: Joi.string().regex(regExp.PASSWORD).error(new Error("Please enter valid data")),
  }),
};

module.exports = {
  createUserSchema,
  updateUserSchema,
};
