const mongoose = require('mongoose');

const User = require('./User');
const { AVATAR } = require('../configs/enums/dataBaseCollections.enum');

const avatarFields = 'avatarURL';

const AvatarSchema = new mongoose.Schema({
  avatarURL: { type: String, trim: true, required: true },
  isMain: { type: Number, required: true, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User }
},
{
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      return ret[avatarFields];
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      return ret[avatarFields];
    }
  }
});

AvatarSchema.pre(/^find/, function() {
  this.populate('user');
});

module.exports = mongoose.model(AVATAR, AvatarSchema);
