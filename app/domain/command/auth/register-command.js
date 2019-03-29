const { BaseCommand, EventEnum } = require('../../../common');

const { success, validationFailed } = EventEnum;
const emailAlreadyExistsMessage = { message: 'E-mail já existente!' };

class RegisterCommand extends BaseCommand {
  constructor(userRepository, userEntity) {
    super();
    this.userRepository = userRepository;
    this.userEntity = userEntity;
  }

  emailAlreadyExists() {
    return this.userRepository.find({ email: this.userEntity.email });
  }

  async saveUser() {
    try {
      await this.userRepository.insert(this.userEntity);

      this.emit(success, {
        id: this.userEntity._id, // eslint-disable-line no-underscore-dangle
        createdAt: this.userEntity.createdAt,
        updatedAt: this.userEntity.updatedAt,
        loggedAt: this.userEntity.loggedAt,
        token: this.userEntity.token,
      });
    } catch (error) {
      console.warn('ERROR:', error);
    }
  }

  async execute(input) {
    this.userEntity.create(input);

    if (!this.userEntity.isValid()) {
      // dados inválidos
      this.emit(validationFailed, this.userEntity.schemaErrors());

      return;
    }

    if (await this.emailAlreadyExists()) {
      // e-mail já está cadastrado
      this.emit(validationFailed, emailAlreadyExistsMessage);

      return;
    }

    this.userEntity.setPassword(input);

    this.saveUser();
  }
}

module.exports = RegisterCommand;
