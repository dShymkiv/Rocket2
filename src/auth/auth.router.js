const authRouter = require('express').Router();

const controller = require('./auth.controller');
const mdlwr = require('./auth.middlewares');
const userMdlwr = require('../users/user.middlewares');
const schema = require('./auth.shemas');
const { validate } = require('../mainValidateFunction');

authRouter.post('/', validate(schema.loginUserSchema), userMdlwr.getUserDynamically('email', 'body'), controller.loginUser);
authRouter.post('/logout', validate(schema.headersSchema), mdlwr.validateAccessToken, controller.logoutUser);
authRouter.post('/refresh', validate(schema.headersSchema), mdlwr.validateRefreshToken, controller.refreshToken);

module.exports = authRouter;
