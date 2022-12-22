const {
  usersList,
  findUserById,
  addUser,
  removeUser,
  updateUser,
} = require('./users.service');

const getUsers = async (req, res) => {
  try {
    const users = await usersList();

    res.json(users);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(+req.params.userId);

    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await addUser(req.body);

    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await removeUser(+req.params.userId);

    res.json({ message: response.message });
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await updateUser(+req.params.userId, req.body);

    res.json(updatedUser);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
};
