const userModel = require('./userModel');

class UserService {
  static async findUserWithQuery(query) {
    const find = userModel.findOne(query);
    if (find) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = UserService;
