const { Handler, EventEnum } = require('../../../common');

const { authorizationError, invalidSession } = EventEnum;

class FindUserHandler extends Handler {
  setupListener(command) {
    super.setupListener(command);

    command.on(authorizationError, this.authorizationError.bind(this));
    command.on(invalidSession, this.invalidSession.bind(this));
  }

  authorizationError(data) {
    this.response.status(401).json(data);
  }

  invalidSession(data) {
    this.response.status(401).json(data);
  }
}

module.exports = FindUserHandler;
