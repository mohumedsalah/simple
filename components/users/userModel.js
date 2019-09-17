// const mongoose = require('mongoose');
const UserSchema = require('./userSchema');

//const { ObjectId } = mongoose.Types;

class UserModel {
  static register(document) {
    const newOne = new UserSchema(document);
    return newOne.save();
  }
  static findOne(query) {
    return UserSchema.findOne(query);
  }
}

module.exports = UserModel;
