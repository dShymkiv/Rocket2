const express = require('express');

const {
  getUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUser,
} = require('./users.controller');
const mdlwr = require('./user.middlewares');

const router = express.Router();

router.get('/', getUsers);
router.post('/', mdlwr.checkCreateUserData, mdlwr.checkIsEmailExist, createUser);

router.use('/:userId', mdlwr.checkIsUserExist);
router.get('/:userId', getUserById);
router.put('/:userId', mdlwr.checkUpdateUserData, mdlwr.checkIsEmailExist, updateUserById);
router.delete('/:userId', deleteUser);

module.exports = router;
