const { EventEmitter } = require('events');

class BaseCommand {
  constructor() {
    Object.assign(this, EventEmitter.prototype);
  }
}

module.exports = BaseCommand;
