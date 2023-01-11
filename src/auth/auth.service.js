const OAuth = require('../../db/OAuth');

const createOAuthTokenPair = (tokenData) => {
  return OAuth.create(tokenData);
};

const getUserByParams = (searchedData = {}) => {
  return OAuth.findOne(searchedData);
};

module.exports = {
  createOAuthTokenPair,
  getUserByParams
};
