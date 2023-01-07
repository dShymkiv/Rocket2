const User = require('../../db/User');
const { buildFilterQuery, buildSortQuery } = require('./user.utils');

/**
 *
 * @param query
 * @returns {Promise<Array<User>>}
 */
const getUsers = async (query = {}) => {
  const { page = 1, perPage = 5, sortBy = '_id', order = 'ASC', ...filterQuery } = query;
  const skip = (page - 1) * perPage;

  const searchedItems = buildFilterQuery(filterQuery);

  const sortQuery = buildSortQuery(sortBy, order);

  const users = await User
    .find(searchedItems)
    .limit(perPage)
    .skip(skip)
    .sort(sortQuery);

  const total = await User.count(searchedItems);

  return {
    data: users,
    page,
    perPage,
    total
  };
};

// const getUsers = () => {
//   return User.find();
// };

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
