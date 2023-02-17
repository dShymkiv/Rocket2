const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const s3FileRouter = require('./fileS3/fileS3.router');
const userRouter = require('./users/user.router');

router.use('/auth', authRouter);
router.use('/files', s3FileRouter);
router.use('/users', userRouter);

module.exports = router;
