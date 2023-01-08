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

module.exports = {
  checkIsUserExist,
  checkIsEmailExist,
};
