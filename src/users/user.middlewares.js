const { NotFound, BadRequest } = require('../../errors/ApiError');
const userService = require('./users.service');

const getUserDynamically = (param, from, dbField = param) => async (req, res, next) => {
  try {
    const searchedField = req[from][param];

    const user = await userService.findUserByParams({ [dbField]: searchedField });

    if (!user) {
      throw new NotFound('User not found');
    }

    // залогінений юзер буде у req.user, а юзер який шукається по id у req.locals ( може бути будь яка назва, зазвичай locals)
    // щоб юзери не перетирались між собою
    req.locals = { ...req.locals, user };

    next();
  } catch (e) {
    next(e);
  }
};

const checkIsUserExistsDynamically = (param, from, dbField = param) => async (req, res, next) => {
  try {
    const searchedField = req[from][param];

    const user = await userService.findUserByParams({ [dbField]: searchedField });

    if (user) {
      throw new BadRequest(`User with such ${param} already exists`);
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserDynamically,
  checkIsUserExistsDynamically,
};
