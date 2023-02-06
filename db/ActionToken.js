const mongoose = require('mongoose');

const User = require('./User');
const { ACTION_TOKEN } = require('../configs/enums/dataBaseCollections.enum');

const ActionTokenSchema = new mongoose.Schema({
  token: { type: String, trim: true, required: true },
  actionType: { type: String, trim: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
},
{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ActionTokenSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = mongoose.model(ACTION_TOKEN, ActionTokenSchema);

// when you have of collection which contains two+ words write it with underscore
// because MongoDB added 's' in the end and make it toLowerCase =>
// => Action_Token => action_token
// => ActionToken => actiontoken
