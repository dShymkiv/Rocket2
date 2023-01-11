const router = require('express').Router();

const userRouter = require('./users/user.router');
const authRouter = require('./auth/auth.router');

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
