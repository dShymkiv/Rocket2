const express = require('express');

const {
  getUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUser,
} = require('./users.controller');
const mdlwr = require('./user.middlewares');
const { validate } = require('../mainValidateFunction');
const schema = require('./user.shemas');

const router = express.Router();

router.get('/', getUsers);
router.post('/', validate(schema.createUserSchema), mdlwr.checkIsEmailExist, createUser);

router.use('/:userId', mdlwr.checkIsUserExist);
router.get('/:userId', getUserById);
router.put('/:userId', validate(schema.updateUserSchema), mdlwr.checkIsEmailExist, updateUserById);
router.delete('/:userId', deleteUser);

module.exports = router;
