const { Schema, model } = require('mongoose');
const rolesEnum = require('../configs/enums/roles.enum');
const { USER } = require('../configs/enums/dataBaseCollections.enum');

const sequreFields = [
  'password'
];

const UserSchema = new Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, lowercase: true, require: true, unique: true },
  age: { type: Number },
  role: { type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER },
  password: { type: String, require: true, min: 8, default: "" }
  // password: { type: String, require: true, min: 8, default: "", select: false }
},
{
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      for (const field of sequreFields) {
        delete ret[field];
      }

      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      for (const field of sequreFields) {
        delete ret[field];
      }

      return ret;
    }
  }
}
);

module.exports = model(USER, UserSchema);
