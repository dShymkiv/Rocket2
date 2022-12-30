const User = require('../../db/User');

const getUsers = () => User.find();

const findUserById = (userId) => User.findById(userId);

const createUser = (user) => User.create(user);

const deleteUser = (userId) => User.deleteOne(userId);

const updateUser = async (user, fieldsToChange) => {
  user.firstName = fieldsToChange.firstName?.length ? fieldsToChange.firstName : user.firstName;
  user.lastName = fieldsToChange.lastName?.length ? fieldsToChange.lastName : user.lastName;
  user.age = fieldsToChange.age ? fieldsToChange.age : user.age;
  // if fieldsToChange.user.lastName = "" => return user.lastName without changes

  await User.findByIdAndUpdate(user._id, user);

  return findUserById(user._id);
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
