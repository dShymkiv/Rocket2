const router = require('express').Router();

const { validate } = require('../mainValidateFunction');
const schema = require('./fileS3.schemas');
const controller = require('./fileS3.controller');
const authController = require('../auth/auth.middlewares');

router.use(authController.validateToken());
router.get('/private', validate(schema.getPrivateFileSchema), controller.getPrivateFileFromS3);

// good for separate server - specially for photo
router.get('/private/stream', validate(schema.getPrivateFileSchema), controller.getPrivateFileStreamFromS3);

module.exports = router;
