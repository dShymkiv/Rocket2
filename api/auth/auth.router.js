const authRouter = require('express').Router();

const { validate } = require('../mainValidateFunction');
const schema = require('./auth.shemas');
const controller = require('./auth.controller');
const mdlwr = require('./auth.middlewares');
const userMdlwr = require('../users/user.middlewares');

const { REFRESH_TOKEN, ACCESS_TOKEN } = require('../../configs/constants');
const actionTokenType = require('../../configs/enums/actionTokenTypes.enum');
const emailType = require('../../configs/enums/emailActionTypes.enum');

authRouter.post('/logout', validate(schema.headersSchema), mdlwr.validateToken(ACCESS_TOKEN), controller.logoutUser);
authRouter.post('/refresh', validate(schema.headersSchema), mdlwr.validateToken(REFRESH_TOKEN), controller.refreshToken);

//set new password
authRouter.patch(
  '/password/forgot',
  validate(schema.setNewPasswordSchema),
  mdlwr.validateToken(actionTokenType.FORGOT_PASSWORD_TOKEN),
  controller.setForgotPasswordEmail
);
//send confirm email
authRouter.patch(
  '/confirm-email',
  validate(schema.headersSchema),
  mdlwr.validateToken(actionTokenType.CONFIRM_ACCOUNT_TOKEN),
  controller.confirmEmail
);

authRouter.use(userMdlwr.getUserDynamically('email', 'body'));

// login
authRouter.post('/', validate(schema.loginUserSchema), controller.loginUser);
//send forgot password email
authRouter.post(
  '/password/forgot',
  validate(schema.forgotPasswordSchema),
  controller.sendActionEmail(actionTokenType.FORGOT_PASSWORD_TOKEN, emailType.FORGOT_PASSWORD)
);

module.exports = authRouter;
