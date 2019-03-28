const RegisterCommand = require('../../../domain/command/auth/register-command');
const mongodb = require('../../../common/lib/mongodb');
const UserRepository = require('../../repository/user');
const { Collections } = require('../../../common');

class RegisterFactory {
  create() {
    return new RegisterCommand(new UserRepository(mongodb, Collections.user));
  }
}

module.exports = RegisterFactory;
