class BaseHandler {
  constructor(request, response, command) {
    this.request = request;
    this.response = response;
    this.command = command;
  }

  handle() {
    this.command.on('success', this.onSuccess.bind(this));

    return this.command.execute(this.request.body);
  }

  onSuccess(data) {
    this.response.json(data);
  }
}

module.exports = BaseHandler;
