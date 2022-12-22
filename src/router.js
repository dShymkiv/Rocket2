const router = require('express').Router();

const userRouter = require('./routers/userRouter');

router.use('/users', userRouter);

module.exports = router;
