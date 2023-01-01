const { Schema, model } = require('mongoose');
const rolesEnum = require('../configs/roles.enum');

const UserSchema = new Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, lowercase: true, require: true, unique: true },
  age: { type: Number },
  role: { type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER },
  password: { type: String, require: true}
},
{
  timestamps: true,
  versionKey: false
}
);

module.exports = model('User', UserSchema);
