const { Unauthorized } = require('../../errors/ApiError');
const oauthService = require('../../services/OAuth.service');
const service = require('./auth.service');
const config = require('../../configs/constants');

const validateAccessToken = async (req, res, next) => {
  try {
    // for getting token from headers
    const accessToken = req.get(config.AUTHORIZATION);

    if (!accessToken) {
      throw new Unauthorized('No token');
    }

    oauthService.validateToken(accessToken, 'accessToken');

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
    // for getting token from headers
    const refreshToken = req.get(config.AUTHORIZATION);

    if (!refreshToken) {
      throw new Unauthorized('No token');
    }

    oauthService.validateToken(refreshToken, 'refreshToken');

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
