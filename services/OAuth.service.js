const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequest, Unauthorized } = require('../errors/ApiError');
const config = require('../configs/config');

const hashPassword = (password) => bcrypt.hash(password, 10);

const checkPasswords = async (hash, password) => {
  const isPasswordsEquals = await bcrypt.compare(password, hash);

  if (!isPasswordsEquals) {
    throw new BadRequest('Email or password is wrong');
  }
};

const generateAccessTokenPair = (encodeData = {}) => {
  const accessToken = jwt.sign(encodeData, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
  const refreshToken = jwt.sign(encodeData, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

  return {
    accessToken,
    refreshToken
  };
};

const validateToken = () => {

};

const validateAccessToken = (accessToken = '') => {
  try {
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new Unauthorized(e.message || 'Invalid token');
    // for not valid token throw only 401 Error -> UNAUTHORIZED
  }
};

module.exports = {
  hashPassword,
  checkPasswords,
  generateAccessTokenPair,
  validateToken,
  validateAccessToken
};
