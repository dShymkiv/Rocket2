const User = require('../../db/User');
const { NotFound, BadRequest } = require('../../errors/ApiError');
const { findUserByEmail } = require('./users.service');

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
    if (req.body?.email) {
      const user = await findUserByEmail(req.body.email);

      if (user[0]?.email === req.body?.email) {
        throw new BadRequest('User with this email already exists');
      }
    }

    next();
  } catch (e) {
    next(e);
  }
};

const checkValidData = (req, res, next) => {
  try {
    if (req.body?.age <= 0 || req.body?.age >= 120) {
      throw new BadRequest('Age is not valid');
    }
    if (req.body?.firstName?.length <= 2 || req.body?.firstName?.length >= 20) {
      throw new BadRequest('First name is not valid');
    }
    if (req.body?.lastName?.length <= 2 || req.body?.lastName?.length >= 20) {
      throw new BadRequest('Last name is not valid');
    }
    if (!req.body.email || !req.body.password) {
      throw new BadRequest('Email and password is required');
    }
    if (req.body.email.length <= 8 || !req.body.email.includes('@') || !req.body.email.includes('.')) {
      throw new BadRequest('Email is not valid');
    }
    if (req.body.password.length < 8) {
      throw new BadRequest('Please enter valid data');
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkIsUserExist, checkIsEmailExist, checkValidData,
};
