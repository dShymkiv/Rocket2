const router = require('express').Router();

const userRouter = require('./users/user.router');

router.use('/users', userRouter);

module.exports = router;
