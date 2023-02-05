const router = require('express').Router();

const controller = require('./user.controller');
const mdlwr = require('./user.middlewares');
const authMdlwr = require('../auth/auth.middlewares');
const commonMdlwr = require('../../middlewares/common.middlewares');
const { validate } = require('../mainValidateFunction');
const schema = require('./user.shemas');

router.get('/', validate(schema.getAllUsersSchema), controller.getUsers);
router.post('/',
  validate(schema.createUserSchema),
  mdlwr.checkIsUserExistsDynamically('email', 'body'),
  controller.createUser
);

router.get('/profile',
  authMdlwr.validateToken(),
  controller.getUserProfile
);

router.use('/:userId',
  validate(schema.userIdParamSchema),
  commonMdlwr.objectIdValidator('userId'),
  mdlwr.getUserDynamically('userId', 'params', '_id'),
);

router.get('/:userId', controller.getUserById);
router.put(
  '/:userId',
  validate(schema.updateUserSchema),
  mdlwr.getUserDynamically('email', 'body'),
  controller.updateUserById
);
router.delete('/:userId', controller.deleteUser);

module.exports = router;
