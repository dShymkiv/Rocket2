const { Unauthorized } = require('../../errors/ApiError');
const oauthService = require('../../services/OAuth.service');
const service = require('./auth.service');

const validateAccessToken = async (req, res, next) => {
  try {
    // for getting token from headers use .get()
    const accessToken = req.get('Authorization');

    if (!accessToken) {
      throw new Unauthorized('No token');
    }

    oauthService.validateToken(accessToken);

    const tokenWithUser = await service.getUserByParams({ accessToken });

    if (!tokenWithUser) {
      throw new Unauthorized('Invalid token');
    }

    req.user = tokenWithUser.user;
    next();
  } catch (e) {
    next(e);
  }
};

const validateRefreshToken = async (req, res, next) => {
  try {
    // for getting token from headers use .get()
    const refreshToken = req.get('Authorization');

    if (!refreshToken) {
      throw new Unauthorized('No token');
    }

    oauthService.validateToken(refreshToken);

    const tokenWithUser = await service.getUserByParams({ refreshToken });

    if (!tokenWithUser) {
      throw new Unauthorized('Invalid token');
    }

    req.user = tokenWithUser.user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validateAccessToken,
  validateRefreshToken
};
