const authRouter = require('express').Router();

const controller = require('./auth.controller');
// const mdlwr = require('./auth.middlewares');
const userMdlwr = require('../users/user.middlewares');

authRouter.post('/',userMdlwr.getUserDynamically('email', 'body'), controller.loginUser);

module.exports = authRouter;
