const User = require("../../db/User");
const ApiError = require('../../errors/ApiError');

const checkIsUserExist = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkIsUserExist
};
