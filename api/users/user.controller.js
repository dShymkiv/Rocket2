const userService = require('./user.service');
const User = require('../../db/User');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');
const { emailService } = require('../../services');
const emailType = require('../../configs/enums/emailActionTypes.enum');
const authService = require('../auth/auth.service');
const actionTokenType = require('../../configs/enums/actionTokenTypes.enum');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.query);

    res.json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = (req, res, next) => {
  try {
    res.json(req.locals.user);
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);

    //send confirmation email
    await authService.sendActionEmail(actionTokenType.CONFIRM_ACCOUNT_TOKEN, emailType.CONFIRM_EMAIL, newUser);

    res.status(CREATED).json(newUser);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user._id);

    res.status(NO_CONTENT);
  } catch (e) {
    next(e);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.locals.user._id, req.body);

    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const emailContext = {
      name: req.user.firstName,
      users: await User.find().lean(),
      condition: false,
    };

    await emailService.sendMail(req.user.email, emailType.WELCOME, emailContext );

    res.json(req.user);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
  getUserProfile
};
