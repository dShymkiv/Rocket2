const OAuth = require('../../db/OAuth');

const createOAuthTokenPair = (tokenData) => {
  return OAuth.create(tokenData);
};

const getUserByParams = (searchedData = {}) => {
  return OAuth.findOne(searchedData).populate('user');
};

const deleteOneUserByParams = (deleteData = {}) => {
  return OAuth.deleteOne(deleteData);
};

const deleteManyUsersByParams = (deleteData = {}) => {
  return OAuth.deleteMany(deleteData);
};

module.exports = {
  createOAuthTokenPair,
  getUserByParams,
  deleteOneUserByParams,
  deleteManyUsersByParams,
};
