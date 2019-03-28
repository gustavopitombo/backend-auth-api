const LoginCommand = require('../../../domain/command/auth/login-command');
const mongodb = require('../../../common/lib/mongodb');
const UserRepository = require('../../repository/user');
const { Collections } = require('../../../common');

class LoginFactory {
  create() {
    return new LoginCommand(new UserRepository(mongodb, Collections.user));
  }
}

module.exports = LoginFactory;
