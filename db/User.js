const mongoose = require('mongoose');

const rolesEnum = require('../configs/enums/roles.enum');
const userStatus = require('../configs/enums/userStatuses.enum');
const { USER } = require('../configs/enums/dataBaseCollections.enum');
const { oauthService } = require('../services');
// const UserStatus = require('./UserStatus');

const sequreFields = ['password', 'status'];

const UserSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, lowercase: true, require: true, unique: true },
  age: { type: Number },
  role: { type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER },
  password: { type: String, require: true, min: 8, default: '' },
  status: { type: String, required: true, trim: true, default: userStatus.PENDING }
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
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

UserSchema.statics = { //for schema
  myFirstStatic() {
    console.log(this); // this => schema ( User )
  },

  async saveUserWithHashedPassword(userObj) {
    const hashPassword = await oauthService.hashPassword(userObj.password);

    return this.create({ ...userObj, password: hashPassword });
  }
};

UserSchema.methods = { // for document
  myFirstMethod() {
    console.log(this); // this => document ( req.user )
  },

  async checkIsPasswordSame(checkPassword) {
    await oauthService.checkPasswords(this.password, checkPassword);
  }
};

module.exports = mongoose.model(USER, UserSchema);
