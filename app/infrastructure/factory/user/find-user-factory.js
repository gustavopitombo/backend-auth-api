const { Collections } = require('../../../common');
const mongodb = require('../../../common/lib/mongodb');
const UserRepository = require('../../repository/user');
const FindUserCommand = require('../../../domain/command/user/find-user-command');
const User = require('../../../domain/entities/user');

const userEntity = new User();
const userRepository = new UserRepository(mongodb, Collections.user);

class FindUserFactory {
  create() {
    return new FindUserCommand(userRepository, userEntity);
  }
}

module.exports = FindUserFactory;
