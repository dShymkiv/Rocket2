const mongoose = require('mongoose');

const User = require('./User');
const { OAUTH } = require('../configs/enums/dataBaseCollections.enum');

const OAuthSchema = new mongoose.Schema({
  accessToken: { type: String, trim: true, required: true },
  refreshToken: { type: String, trim: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
},
{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

OAuthSchema.pre(/^find/, function() {
  this.populate('user');
});

module.exports = mongoose.model(OAUTH, OAuthSchema);
