const User = require('../../db/User');
const { NotFound, BadRequest } = require('../../errors/ApiError');
const { findUserByEmail } = require('./users.service');
const schema = require('./user.shemas');

const checkIsUserExist = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw new NotFound('User not found');
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

const checkIsEmailExist = async (req, res, next) => {
  try {
    if (req.body.body?.email) {
      const user = await findUserByEmail(req.body.body.email);

      if (user[0]?.email === req.body?.body?.email) {
        throw new BadRequest('User with this email already exists');
      }
    }

    next();
  } catch (e) {
    next(e);
  }
};

const checkCreateUserData = async (req, res, next) => {
  try {
    const { error, value } = await schema.createUserSchema.body.validate(req.body);

    if (error) {
      throw new BadRequest(error);
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const checkUpdateUserData = async (req, res, next) => {
  try {
    const keysToValidate = ["body", "params"];

    for (const key of keysToValidate) {
      const validationResult = await schema.updateUserSchema[key].validate(req[key]);

      if (validationResult.error) {
        return next({status: 400, message: `${validationResult.error.message}`});
      }
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkIsUserExist,
  checkIsEmailExist,
  checkCreateUserData,
  checkUpdateUserData,
};
