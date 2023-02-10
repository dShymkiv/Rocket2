const mongoose = require('mongoose');

const User = require('./User');
const { AVATAR } = require('../configs/enums/dataBaseCollections.enum');

const AvatarSchema = new mongoose.Schema({
  avatarURL: { type: String, trim: true, required: true },
  isMain: { type: Number, required: true, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User }
},
{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// AvatarSchema.pre(/^find/, function() {
//   this.populate('user');
// });

AvatarSchema.statics = {
  async getUserAvatars(userId) {
    const avatars = await this.find({user: userId}).sort({ 'updatedAt': -1 }).select('avatarURL');
    return avatars.map((avatar) => avatar.avatarURL);
  }
};

module.exports = mongoose.model(AVATAR, AvatarSchema);
