const User = require('../../db/User');

const getUsers = () => {
  return User.find();
};

const findUserById = (userId) => {
  return User.findById(userId);
};

const findUserByEmail = (email) => {
  return User.find({email});
};

const createUser = (user) => {
  return User.create(user);
};

const deleteUser = (userId) => {
  return User.deleteOne(userId);
};

/**
 * JSDoc
 *
 * @param user
 * @param fieldsToChange
 * @returns {Promise<User>}
 */
const updateUser = async (user, fieldsToChange) => {
  user.firstName = fieldsToChange.firstName?.length ? fieldsToChange.firstName : user.firstName;
  user.lastName = fieldsToChange.lastName?.length ? fieldsToChange.lastName : user.lastName;
  user.age = fieldsToChange.age ? fieldsToChange.age : user.age;
  // if fieldsToChange.user.lastName = "" => return user.lastName without changes
  user.password = fieldsToChange.password ? fieldsToChange.password : user.password;


  await User.findByIdAndUpdate(user._id, user);

  return findUserById(user._id);
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  findUserByEmail,
};
