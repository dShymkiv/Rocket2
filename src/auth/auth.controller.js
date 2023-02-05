const emailType = require('../../configs/enums/emailActionTypes.enum');
const actionTokenType = require('../../configs/enums/actionTokenTypes.enum');
const config = require('../../configs/constants');
const { FRONTEND_URL } = require('../../configs/config');
const { NO_CONTENT } = require('../../errors/error.codes');

const service = require('./auth.service');
const userService = require('../users/user.service');
const { oauthService, emailService } = require('../../services');

const loginUser = async (req, res, next) => {
  try {
    const user = req.locals.user;

    await emailService.sendMail(user.email, emailType.WELCOME, { name: user.firstName });
    await oauthService.checkPasswords(user.password, req.body.password);

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

// send email for forgot password
const sendForgotPasswordEmail = async (req, res, next) => {
  try {
    const user = req.locals.user;

    const forgotPasswordToken = oauthService.generateActionToken(
      actionTokenType.FORGOT_PASSWORD_TOKEN,
      { email: user.email }
    );

    //save action token to DB
    await service.createActionToken({
      token: forgotPasswordToken,
      actionType: actionTokenType.FORGOT_PASSWORD_TOKEN,
      user: user._id
    });

    const forgotPassURL = `${FRONTEND_URL}/forgot-password?token=${forgotPasswordToken}`;

    await emailService.sendMail(user.email, emailType.FORGOT_PASSWORD, { forgotPassURL });

    res.json("ok");
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

    res.json("ok");
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
  sendForgotPasswordEmail,
  setForgotPasswordEmail
};
