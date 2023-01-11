const Joi = require('joi');

const regExp = require('../../configs/enums/regexp.enum');
const { ID, FIRST_NAME, LAST_NAME, AGE, EMAIL, ROLE, CREATED_AT, UPDATED_AT } = require('../../configs/enums/sortFields.enum');

const getAllUsersSchema = {
  query: Joi.object().keys({
    page: Joi.string().alphanum().trim().default('1'),
    perPage: Joi.number().integer().default(5),
    sortBy: Joi.string()
      .valid(ID, FIRST_NAME, LAST_NAME, EMAIL, AGE, ROLE, CREATED_AT, UPDATED_AT)
      .default('_id')
      .error(new Error("Please enter a valid 'sortBy' parameter")),
    order: Joi.string()
      .valid('ASC', 'DESC')
      .default('ASC')
      .error(new Error("Please enter a valid 'order' parameter")),
    ageGte: Joi.number(),
    ageLte: Joi.number(),
    dateGte: Joi.string().alphanum().regex(regExp.DATE),
    dateLte: Joi.string().alphanum().regex(regExp.DATE),
  }),
};

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

const userIdParamSchema = {
  params: Joi.object()
    .keys({
      userId: Joi.string().alphanum().required(),
    })
    .required(),
};

module.exports = {
  getAllUsersSchema,
  createUserSchema,
  updateUserSchema,
  userIdParamSchema
};
