const { BaseCommand, EventEnum } = require('../../../common');

const { success } = EventEnum;

class LoginCommand extends BaseCommand {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      const user = await this.userRepository.findBydId('123');

      this.emit(success, { user, message: 'Logged!' });
    } catch (error) {
      console.warn('ERROR:', error);
    }
  }
}

module.exports = LoginCommand;
