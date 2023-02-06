const emailType = require('../../configs/enums/emailActionTypes.enum');
const userStatus = require('../../configs/enums/userStatuses.enum');
const config = require('../../configs/constants');
const { NO_CONTENT } = require('../../errors/error.codes');

const service = require('./auth.service');
const userService = require('../users/user.service');
const { oauthService, emailService } = require('../../services');
const { ACTIVE, PENDING } = require('../../configs/enums/userStatuses.enum');
const { Unauthorized } = require('../../errors/ApiError');

const loginUser = async (req, res, next) => {
  try {
    const user = req.locals.user;

    if (user.status !== ACTIVE) {
      throw new Unauthorized(`Your account ${ user.status === PENDING ? 'is not confirmed' : 'is blocked' }`);
    }

    await emailService.sendMail(user.email, emailType.WELCOME, { name: user.firstName });
    //await oauthService.checkPasswords(user.password, req.body.password);

    await user.checkIsPasswordSame(req.user.password);
    const tokenPair = oauthService.generateAccessTokenPair({ ...user._id });

    await service.createOAuthTokenPair({ ...tokenPair, user: user._id });

    res.json({
      ...tokenPair,
      user
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    // logout from one device
    const accessToken = req.get(config.AUTHORIZATION);
    await service.deleteOneUserByParams({ accessToken });

    // logout from all devices
    // await service.deleteManyUsersByParams({ user: req.user._id });

    res.status(NO_CONTENT).json();
  } catch (e) {
    next(e);
  }
};

const sendActionEmail = (actionTokenType = '', emailType) => async (req, res, next) => {
  try {
    await service.sendActionEmail(actionTokenType, emailType, req.locals.user);

    res.json("Email sent");
  } catch (e) {
    next(e);
  }
};

const setForgotPasswordEmail = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const hashPassword = await oauthService.hashPassword(req.body.password);

    await userService.updateUser(userId, { password: hashPassword }); // new password
    // log out from all devices
    await service.deleteManyUsersByParams({ user: userId });

    res.json('Password successfully updated');
  } catch (e) {
    next(e);
  }
};

const confirmEmail = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    // const status = userStatus.ACTIVE;

    await userService.updateUser(userId, { status: userStatus.ACTIVE });

    res.json('Email is confirmed');
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const user = req.user;

    const refreshToken = req.get(config.AUTHORIZATION);

    await service.deleteOneUserByParams({ refreshToken });

    const tokenPair = oauthService.generateAccessTokenPair({ ...user._id });

    await service.createOAuthTokenPair({ ...tokenPair, user: user._id });
    res.json({ ...tokenPair, user });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  refreshToken,
  sendActionEmail,
  setForgotPasswordEmail,
  confirmEmail
};
