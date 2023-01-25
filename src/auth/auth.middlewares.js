const { Unauthorized } = require('../../errors/ApiError');
const oauthService = require('../../services/OAuth.service');
const service = require('./auth.service');
const config = require('../../configs/constants');

const validateToken = (tokenType = config.ACCESS_TOKEN) => async (req, res, next) => {
  try {
    // for getting token from headers
    const token = req.get(config.AUTHORIZATION);

    if (!token) {
      throw new Unauthorized('No token');
    }

    await oauthService.validateToken(token, tokenType);

    const tokenWithUser = await service.getUserByParams({ [tokenType]: token });

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
  validateToken,
};
