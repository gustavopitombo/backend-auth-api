const RegisterCommand = require('../../../domain/command/auth/register-command');

class RegisterFactory {
  create() {
    return new RegisterCommand();
  }
}

module.exports = RegisterFactory;
