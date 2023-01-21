const config = require('../../configs/constants');
const service = require('./auth.service');
const oauthService = require('../../services/OAuth.service');
const { NO_CONTENT } = require('../../errors/error.codes');

const loginUser = async (req, res, next) => {
  try {
    const user = req.locals.user;

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
  refreshToken
};
