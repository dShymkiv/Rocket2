const User = require('../../db/User');
const { buildFilterQuery, buildSortQuery } = require('./user.utils');
const oauthService = require('../../services/OAuth.service');

/**
 * JSDoc
 * @param query {Object}
 * @returns {Promise<data: Array<User>, page: Number, perPage: Number, total: Number>}
 */
const getUsers = async (query = {}) => {
  const { page, perPage, sortBy, order, ...filterQuery } = query;
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

/**
 *
 * @param searchObj {Object}
 * @returns {Promise<User>}
 */
const findUserByParams = (searchObj) => {
  return User.findOne(searchObj);
};

/**
 *
 * @param user {Object}
 * @returns {Promise<User>}
 */
const createUser = (user) => {
  return User.saveUserWithHashedPassword(user);
  // const hashPassword = await oauthService.hashPassword(user.password);
  // return User.create({ ...user, password: hashPassword });
};

/**
 *
 * @param userId {String}
 */
const deleteUser = (userId) => {
  return User.deleteOne(userId);
};

/**
 *
 * @param userId {String}
 * @param fieldsToChange {Partial<User}
 * @returns {Promise<User>}
 */
const updateUser = async (userId, fieldsToChange) => {
  await User.findOneAndUpdate(userId, fieldsToChange);

  return findUserByParams({ _id: userId} );
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  findUserByParams,
};
