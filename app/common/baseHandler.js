const EventEnum = require('./eventEnum');

const { success, validationFailed } = EventEnum;

class BaseHandler {
  constructor(request, response, command) {
    this.request = request;
    this.response = response;
    this.command = command;
  }

  async handle() {
    try {
      this.setupListener(this.command);

      await this.command.execute(this.request.body, this.request.params, this.request.headers);
    } catch (error) {
      console.warn(error);
    }
  }

  setupListener(command) {
    command.on(success, this.onSuccess.bind(this));
    command.on(validationFailed, this.validationFailed.bind(this));
  }

  onSuccess(data) {
    this.response.status(200).json(data);
  }

  validationFailed(errors) {
    this.response.status(401).json(errors);
  }
}

module.exports = BaseHandler;
