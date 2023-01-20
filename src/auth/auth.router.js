const authRouter = require('express').Router();

const controller = require('./auth.controller');
const mdlwr = require('./auth.middlewares');
const userMdlwr = require('../users/user.middlewares');

authRouter.post('/', userMdlwr.getUserDynamically('email', 'body'), controller.loginUser);
authRouter.post('/logout', mdlwr.validateAccessToken, controller.logoutUser);
authRouter.post('/refresh', mdlwr.validateRefreshToken, controller.refreshToken);

module.exports = authRouter;
