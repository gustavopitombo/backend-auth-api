const { Collections } = require('../../../common');
const mongodb = require('../../../common/lib/mongodb');
const UserRepository = require('../../repository/user');
const RegisterCommand = require('../../../domain/command/auth/register-command');
const User = require('../../../domain/entities/user');

const userEntity = new User();
const userRepository = new UserRepository(mongodb, Collections.user);

class RegisterFactory {
  create() {
    return new RegisterCommand(userRepository, userEntity);
  }
}

module.exports = RegisterFactory;
