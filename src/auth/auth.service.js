const OAuth = require('../../db/OAuth');
const ActionToken = require('../../db/ActionToken');

const createOAuthTokenPair = (tokenData) => {
  return OAuth.create(tokenData);
};

const getOAuthTokenByParams = (searchedData = {}) => {
  return OAuth.findOne(searchedData).populate('user');
};

const deleteOneUserByParams = (deleteData = {}) => {
  return OAuth.deleteOne(deleteData);
};

const deleteManyUsersByParams = (deleteData = {}) => {
  return OAuth.deleteMany(deleteData);
};

// Action Token Schema functions
const createActionToken = (tokenData) => {
  return ActionToken.create(tokenData);
};

const deleteActionTokenByParams = (deleteData) => {
  return ActionToken.deleteOne(deleteData);
};

const getActionTokenByParams = (searchedData = {}) => {
  return ActionToken.findOne(searchedData).populate('user');
};

module.exports = {
  createOAuthTokenPair,
  getOAuthTokenByParams,
  deleteOneUserByParams,
  deleteManyUsersByParams,
  createActionToken,
  deleteActionTokenByParams,
  getActionTokenByParams
};
