const { Unauthorized } = require('../../errors/ApiError');
const oauthService = require('../../services/OAuth.service');
const service = require('./auth.service');

const validateAccessTokenforUserProfile = async (req, res, next) => {
  try {
    // for getting token from headers use .get()
    const accessToken = req.get('Authorization');

    if (!accessToken) {
      throw new Unauthorized('No token');
    }

    oauthService.validateAccessToken(accessToken);

    const xxx = await service.getUserByParams({ accessToken });

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validateAccessTokenforUserProfile
};
