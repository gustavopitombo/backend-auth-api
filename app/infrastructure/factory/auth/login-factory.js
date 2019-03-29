const { Collections } = require('../../../common');
const mongodb = require('../../../common/lib/mongodb');
const UserRepository = require('../../repository/user');
const LoginCommand = require('../../../domain/command/auth/login-command');
const User = require('../../../domain/entities/user');

const userEntity = new User();
const userRepository = new UserRepository(mongodb, Collections.user);

class LoginFactory {
  create() {
    return new LoginCommand(userRepository, userEntity);
  }
}

module.exports = LoginFactory;
