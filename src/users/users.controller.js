const userService = require('./users.service');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');

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
    const updatedUser = await userService.updateUser(req.user, req.body);

    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
};

const getUserProfile = (req, res, next) => {
  try {

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
