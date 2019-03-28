const { BaseCommand, EventEnum } = require('../../../common');

const { success } = EventEnum;

class RegisterCommand extends BaseCommand {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      const user = await this.userRepository.insert({ name: 'Gustavo', userId: '123' });

      this.emit(success, { user, message: 'register!' });
    } catch (error) {
      console.warn('ERROR:', error);
    }
  }
}

module.exports = RegisterCommand;
