const userService = require('./user.service');
const User = require('../../db/User');
const Avatar = require('../../db/Avatar');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');
const { emailService, fileS3Service } = require('../../services');
const emailType = require('../../configs/enums/emailActionTypes.enum');
const authService = require('../auth/auth.service');
const actionTokenType = require('../../configs/enums/actionTokenTypes.enum');
const { ServerError } = require('../../errors/ApiError');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.query);

    res.json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = req.locals.user.toObject();
    const userAvatar = await userService.findMainUserAvatar(user._id);

    user.userAvatars = [userAvatar?.avatarURL];

    res.json(user);
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
      name: req.user.firstName, users: await User.find().lean(), condition: false,
    };

    const userAvatars = await Avatar.getUserAvatars(req.user._id);

    await emailService.sendMail(req.user.email, emailType.WELCOME, emailContext);

    res.json({ ...req.user.toObject(), userAvatars });
  } catch (e) {
    next(e);
  }
};

const uploadUserAvatar = async (req, res, next) => {
  try {
    const data = await fileS3Service.uploadFileToS3(req.files.avatar, req.params.userId, 'user'); // url

    if (!data) {
      throw new ServerError(`Something went wrong... Cannot upload ${req.files.avatar}`);
    }

    await userService.saveUserAvatar(data, req.params.userId);
    await userService.updateUser(req.params.userId, { avatar: data });

    res.json({ url: data });
  } catch (e) {
    next(e);
  }
};

const updateMainUserAvatar = async (req, res, next) => {
  try {
    await userService.updateMainAvatar(req.params.avatarId);

    res.json('updated');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers, getUserById, createUser, deleteUser, updateUserById, getUserProfile, uploadUserAvatar, updateMainUserAvatar
};
