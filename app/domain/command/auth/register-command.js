const { BaseCommand, EventEnum } = require('../../../common');

const { success } = EventEnum;

class RegisterCommand extends BaseCommand {
  async execute() {
    this.emit(success, { message: 'Registered!' });
  }
}

module.exports = RegisterCommand;
