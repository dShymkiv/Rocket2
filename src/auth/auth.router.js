const authRouter = require('express').Router();

const controller = require('./auth.controller');
const mdlwr = require('./auth.middlewares');
const userMdlwr = require('../users/user.middlewares');
const schema = require('./auth.shemas');
const { validate } = require('../mainValidateFunction');
const { REFRESH_TOKEN, ACCESS_TOKEN } = require('../../configs/constants');
const { FORGOT_PASSWORD_TOKEN } = require('../../configs/enums/actionTokenTypes.enum');

authRouter.post('/logout', validate(schema.headersSchema), mdlwr.validateToken(ACCESS_TOKEN), controller.logoutUser);
authRouter.post('/refresh', validate(schema.headersSchema), mdlwr.validateToken(REFRESH_TOKEN), controller.refreshToken);

//set new password
authRouter.patch('/password', mdlwr.validateToken(FORGOT_PASSWORD_TOKEN), controller.setForgotPasswordEmail);

authRouter.use(userMdlwr.getUserDynamically('email', 'body'));
authRouter.post('/', validate(schema.loginUserSchema), controller.loginUser);
//send forgot password email
authRouter.post('/password/forgot', controller.sendForgotPasswordEmail);

module.exports = authRouter;
