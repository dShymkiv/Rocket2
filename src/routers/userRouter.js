const express = require('express');
const {
  getUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUser,
} = require("../users/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUserById);
router.post("/", createUser);
router.delete("/:userId", deleteUser);

module.exports = router;
