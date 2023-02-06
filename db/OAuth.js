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

// rename field making virtual field with ref ( if we need field but we don't have reference )
//
// OAuthSchema.virtual('testUser', {
//   ref: 'User',
//   localField: 'user', // fieldName in our collection
//   foreignField: '_id' // fieldName in DB
// });
// OAuthSchema.pre(/^find/, function() {
//   this.populate('user');
//   this.populate('testUser');
// });

// prehooks => work before you receive res // posthooks => after obj was updated, insert...
OAuthSchema.pre('findOne', function() {
  this.populate('user');
}); // now we don't need .populate in the service ( but only with 'findOne' method )

// OAuthSchema.pre(/^find/, function() {
//   this.populate('user');
// }); // for many => use regexp  ( but it returns array )

module.exports = mongoose.model(OAUTH, OAuthSchema);
