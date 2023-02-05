const OAuth = require('../../db/OAuth');
const ActionToken = require('../../db/ActionToken');
const { oauthService, emailService } = require('../../services');
const { FRONTEND_URL } = require('../../configs/config');

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

const sendActionEmail = async (actionTokenType = '', emailType, user) => {

  const actionToken = oauthService.generateActionToken(
    actionTokenType,
    { email: user.email }
  );

  //save action token to DB
  await createActionToken({
    token: actionToken,
    actionType: actionTokenType,
    user: user._id
  });

  const actionTokenURL = `${FRONTEND_URL}?token=${actionToken}`;

  await emailService.sendMail(user.email, emailType, { actionTokenURL });
};


module.exports = {
  createOAuthTokenPair,
  getOAuthTokenByParams,
  deleteOneUserByParams,
  deleteManyUsersByParams,
  createActionToken,
  deleteActionTokenByParams,
  getActionTokenByParams,
  sendActionEmail
};
