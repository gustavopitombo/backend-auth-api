const { BaseCommand, EventEnum } = require('../../../common');

const { success, validationFailed } = EventEnum;
const invalidSignInMessage = { message: 'Usuário e/ou senha inválidos' };

class LoginCommand extends BaseCommand {
  constructor(userRepository, userEntity) {
    super();
    this.userRepository = userRepository;
    this.userEntity = userEntity;
  }

  async updateUser() {
    try {
      await this.userRepository.update({ _id: this.userEntity._id, loggedAt: this.userEntity.loggedAt }, { upsert: true });
    } catch (error) {
      console.warn('ERROR:', error);
    }
  }

  async execute(input) {
    const user = await this.userRepository.find({ email: input.email });

    if (!user) {
      // e-mail não existe
      this.emit(validationFailed, invalidSignInMessage);

      return;
    }

    if (!await this.userEntity.validatePassword(input.senha, user.senha)) {
      // senha não confere
      this.emit(validationFailed, invalidSignInMessage);

      return;
    }

    user.loggedAt = null;

    this.userEntity.create(user);

    await this.updateUser();

    try {
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
}

module.exports = LoginCommand;
