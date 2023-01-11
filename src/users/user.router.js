const router = require('express').Router();

const controller = require('./users.controller');
const mdlwr = require('./user.middlewares');
const authMdlwr = require('../auth/auth.middlewares');
const { validate } = require('../mainValidateFunction');
const schema = require('./user.shemas');

router.get('/', validate(schema.getAllUsersSchema), controller.getUsers);
router.post('/',
  validate(schema.createUserSchema),
  mdlwr.checkIsUserExistsDynamically('email', 'body'),
  controller.createUser
);

router.use('/:userId',
  validate(schema.userIdParamSchema),
  mdlwr.getUserDynamically('userId', 'params', '_id'),
);

router.get('/:userId', controller.getUserById);
router.put(
  '/:userId',
  validate(schema.updateUserSchema),
  mdlwr.checkIsUserExistsDynamically('email', 'body'),
  controller.updateUserById
);
router.delete('/:userId', controller.deleteUser);

router.get('/profile',authMdlwr.validateAccessTokenforUserProfile, controller.getUserProfile);

module.exports = router;
