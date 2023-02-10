const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequest, Unauthorized, ServerError } = require('../errors/ApiError');
const config = require('../configs/config');
const { FORGOT_PASSWORD_TOKEN, CONFIRM_ACCOUNT_TOKEN } = require('../configs/enums/actionTokenTypes.enum');

const hashPassword = (password) => bcrypt.hash(password, 10);

const checkPasswords = async (hash, password) => {
  const isPasswordsEquals = await bcrypt.compare(password, hash);

  if (!isPasswordsEquals) {
    throw new BadRequest('Email or password is wrong');
  }
};

const generateAccessTokenPair = (encodeData = {}) => {
  const accessToken = jwt.sign(encodeData, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(encodeData, config.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

  return {
    accessToken,
    refreshToken
  };
};

const generateActionToken = (actionType, encodeData = {}) => {
  let expiresIn = '24h';
  let secretTokenWord = '';

  switch (actionType) {
    case FORGOT_PASSWORD_TOKEN:
      secretTokenWord = FORGOT_PASSWORD_TOKEN;
      break;

    case CONFIRM_ACCOUNT_TOKEN:
      expiresIn = '12h';
      secretTokenWord = CONFIRM_ACCOUNT_TOKEN;
      break;

    default:
      throw new ServerError('Wrong action token');
  }

  return jwt.sign(encodeData, secretTokenWord, { expiresIn });
};

const validateToken = (token = '', tokenType = 'accessToken') => {
  try {
    switch (tokenType) {
      case 'accessToken':
        tokenType = config.ACCESS_TOKEN_SECRET;
        break;

      case 'refreshToken':
        tokenType = config.REFRESH_TOKEN_SECRET;
        break;

      case 'forgotPasswordToken':
        tokenType = FORGOT_PASSWORD_TOKEN;
        break;

      case 'confirmAccountToken':
        tokenType = CONFIRM_ACCOUNT_TOKEN;
        break;

      default:
        throw new BadRequest('Wrong token type');
    }

    console.log(token, "token")
    console.log(tokenType, "tokenType")


    return jwt.verify(token, tokenType);
  } catch (e) {
    throw new Unauthorized(e.message || 'Invalid token');
  }
};

module.exports = {
  hashPassword,
  checkPasswords,
  generateAccessTokenPair,
  generateActionToken,
  validateToken,
};
