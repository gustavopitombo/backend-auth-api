const { BaseCommand, EventEnum } = require('../../../common');

const { success } = EventEnum;

class LoginCommand extends BaseCommand {
  async execute() {
    this.emit(success, { message: 'Logged!' });
  }
}

module.exports = LoginCommand;
