const { NotFound, BadRequest } = require('../../errors/ApiError');
const userService = require('./user.service');
const { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } = require('../../configs/file.config');

const getUserDynamically = (param, from, dbField = param) => async (req, res, next) => {
  try {
    const searchedField = req[from][param];

    let user = await userService.findUserByParams({ [dbField]: searchedField });

    if (!user) {
      throw new NotFound('User not found');
    }

    // avatar doesn't appear
    user = user.toObject();
    
    user.userAvatar = await userService.findMainUserAvatar(user._id);

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

const checkUserAvatar = (req, res, next) => {
  try {
    if (!req.files?.avatar) {
      throw new BadRequest('No file');
    }

    const { name, size, mimetype } = req.files.avatar;

    if (size > IMAGE_MAX_SIZE) {
      throw new BadRequest(`File ${name} is too big`);
    }

    if (!IMAGE_MIMETYPES.includes(mimetype)) {
      throw new BadRequest('Not valid file type');
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserDynamically,
  checkIsUserExistsDynamically,
  checkUserAvatar
};
