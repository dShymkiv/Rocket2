const mongoose = require('mongoose');

const { USER_STATUS } = require('../configs/enums/dataBaseCollections.enum');

const UserStatusSchema = new mongoose.Schema({
  statusTitle: { type: String },
  statusId: { type: Number },
},
{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model(USER_STATUS, UserStatusSchema);
