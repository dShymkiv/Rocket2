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
  return User.findOne(searchObj).select('+password');

  // return User.findOne(searchObj).select('_id'); // _id always selected;
  // .select('firstName age email'); selected fields add with spaces => return _id, firstName, age, email
};

/**
 *
 * @param user {Object}
 * @returns {Promise<User>}
 */
const createUser = async (user) => {
  const hashPassword = await oauthService.hashPassword(user.password);

  return User.create({ ...user, password: hashPassword });
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
 * @param user {Object}
 * @param fieldsToChange {Object}
 * @returns {Promise<Partial<User>>}
 */
const updateUser = async (user, fieldsToChange) => {
  user.firstName = fieldsToChange.firstName?.length ? fieldsToChange.firstName : user.firstName;
  user.lastName = fieldsToChange.lastName?.length ? fieldsToChange.lastName : user.lastName;
  user.age = fieldsToChange.age ? fieldsToChange.age : user.age;
  // if fieldsToChange.user.lastName = "" => return user.lastName without changes
  user.password = fieldsToChange.password ? fieldsToChange.password : user.password;


  await User.findByIdAndUpdate(user._id, user);

  return findUserByParams({ _id: user._id} );
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  findUserByParams,
};
