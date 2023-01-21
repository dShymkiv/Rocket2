const config = require('../../configs/constants');
const service = require('./auth.service');
const oauthService = require('../../services/OAuth.service');
const { NO_CONTENT } = require('../../errors/error.codes');

// By default, Mongoose queries return an instance of the Mongoose Document class.
// Documents are much heavier than vanilla JavaScript objects, because they have a => vanilla JavaScript - JS without libraries
// lot of internal state for change tracking. Enabling the lean option tells Mongoose
// to skip instantiating a full Mongoose document and just give you the POJO. => Plain old Java object
//
// const leanDoc = await MyModel.findOne().lean();
//
// v8Serialize(normalDoc).length; // approximately 180
// v8Serialize(leanDoc).length; // 32, about 5x smaller!
//
// // In case you were wondering, the JSON form of a Mongoose doc is the same
// // as the POJO. This additional memory only affects how much memory your
// // Node.js process uses, not how much data is sent over the network.
// JSON.stringify(normalDoc).length === JSON.stringify(leanDoc).length; // true
//
// .lean() = .toObject()    => if we need the Mongoose Document in the future, we use toObject
//                             if POJO -> use lean()
//
// .toObject() truncates the object - leaves only needed data
//
// .toObject() - done only once

const loginUser = async (req, res, next) => {
  try {
    // const user = req.user.toObject();
    const user = req.locals.user;

    await oauthService.checkPasswords(user.password, req.body.password);
    // const tokenPair = oauthService.generateAccessTokenPair(user);
    const tokenPair = oauthService.generateAccessTokenPair({ ...user._id });

    await service.createOAuthTokenPair({ ...tokenPair, user: user._id });

    // await service.createOAuthTokenPair({
    // accessToken: tokenPair.accessToken,
    // refreshToken: tokenPair.refreshToken,
    // userId: user._id
    // });
    //
    // if fieldNames will be different from the OAuth.Schema
    // => Error "OAuth validation failed: userId: Path `userId` is required."
    //
    // _id === user._id => false
    // _id.toString() === user._id.toString() => true
    //  console.log(_id) => new ObjectId("63beb68d4d0eaa5f3a39625c") -> _id is reference to the obj
    // because of that => _id === user._id => false

    res.json({
      ...tokenPair,
      user
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    // logout from one device
    const accessToken = req.get(config.AUTHORIZATION);
    await service.deleteOneUserByParams({ accessToken });

    // logout from all devices
    // await service.deleteManyUsersByParams({ user: req.user._id });

    res.status(NO_CONTENT).json();
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const user = req.user;

    const refreshToken = req.get(config.AUTHORIZATION);

    await service.deleteOneUserByParams({ refreshToken });

    const tokenPair = oauthService.generateAccessTokenPair({ ...user._id });

    await service.createOAuthTokenPair({ ...tokenPair, user: user._id });
    res.json({ ...tokenPair, user });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  refreshToken
};
