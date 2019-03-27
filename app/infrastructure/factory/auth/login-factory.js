const LoginCommand = require('../../../domain/command/auth/login-command');

class LoginFactory {
  create() {
    return new LoginCommand();
  }
}

module.exports = LoginFactory;
