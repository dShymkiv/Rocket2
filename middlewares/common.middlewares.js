const ObjectId = require('mongoose').Types.ObjectId;

const { BadRequest } = require('../errors/ApiError');

const objectIdValidator = (param) => (req, res, next) => {
  try {
    const isIdValid = ObjectId.isValid(req.params[param]);

    if (!isIdValid) {
      throw new BadRequest('ID is not valid');
    }

    next();
  } catch (e) {
    next(e);
  }
};


module.exports = {
  objectIdValidator,
};
