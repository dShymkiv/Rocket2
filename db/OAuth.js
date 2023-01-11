const mongoose = require('mongoose');

const User = require('./User');
const { OAUTH } = require('../configs/enums/dataBaseCollections.enum');

const OAuthSchema = new mongoose.Schema({
  accessToken: { type: String, trim: true, required: true },
  refreshToken: { type: String, trim: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },

  // userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  // => 'User' - sometimes doesn't work, need to make variable
},
{
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model(OAUTH, OAuthSchema);
