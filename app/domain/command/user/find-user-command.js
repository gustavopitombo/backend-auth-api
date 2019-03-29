const { BaseCommand, EventEnum } = require('../../../common');

const { success, authorizationError, invalidSession } = EventEnum;

class FindUserCommand extends BaseCommand {
  constructor(userRepository, userEntity) {
    super();
    this.userRepository = userRepository;
    this.userEntity = userEntity;
  }

  validateToken(user, headers) {
    const xapptoken = headers['x-access-token'];
    const bearer = xapptoken.split(' ');
    const token = bearer[1];

    return user.token === token;
  }

  validateSession(user) {
    const datenow = Date.now();
    const loggedDate = new Date(user.loggedAt).getTime();
    const diffDate = datenow - loggedDate;

    return diffDate < (60 * 30 * 1000);
  }

  async execute(input, params, headers) {
    const user = await this.userRepository.find({ _id: params.id });

    if (!user) {
      // usuario ou token não existem
      this.emit(authorizationError, { message: 'Não autorizado' });

      return;
    }

    if (!this.validateToken(user, headers)) {
      // token não pertence a esse usuário
      this.emit(authorizationError, { message: 'Não autorizado' });

      return;
    }

    if (!this.validateSession(user)) {
      // último login a mais de 30 minutos
      this.emit(invalidSession, { message: 'Sessão inválida' });

      return;
    }

    this.userEntity.create(user);

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

module.exports = FindUserCommand;
