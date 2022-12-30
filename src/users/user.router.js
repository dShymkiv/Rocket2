const express = require('express');

const {
  getUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUser,
} = require('./users.controller');
const mdlwr = require('../users/user.middleware');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

router.use('/:userId', mdlwr.checkIsUserExist);
router.get('/:userId', getUserById);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUser);

module.exports = router;
