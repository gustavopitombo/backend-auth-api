const Joi = require('joi');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../../config');

const rules = Joi.object().keys({
  _id: Joi.string(),
  nome: Joi.string().required(),
  email: Joi.string().required(),
  senha: Joi.string().required(),
  telefones: Joi.array(),
  loggedAt: Joi.date(),
  updatedAt: Joi.date(),
  createdAt: Joi.date(),
  token: Joi.string().required(),
});

const generatePassword = (senha) => {
  const salt = bcrypt.genSaltSync(config.app.salt);

  return bcrypt.hashSync(senha, salt);
};

const generateToken = email => jwt.sign({ email }, config.app.secret, { expiresIn: 30000 });

class User {
  create({
    _id,
    nome,
    email,
    senha,
    telefones,
    loggedAt,
    updatedAt,
    createdAt,
    token,
  }) {
    this._id = _id || uuid(); // eslint-disable-line no-underscore-dangle
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefones = telefones;
    this.loggedAt = loggedAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.createdAt = createdAt || new Date();
    this.token = token || generateToken(email);
  }

  isValid() {
    return Joi.validate(this, rules).error === null;
  }

  schemaErrors(msg = 'invalidSchema') {
    return {
      message: msg,
      errors: Joi.validate(this, rules).error,
    };
  }

  validatePassword(inputPass, userPass) {
    return bcrypt.compare(inputPass, userPass);
  }

  setPassword({ senha }) {
    this.senha = generatePassword(senha);
  }

  validateSession({ loggedAt }) {
    return Date.now - new Date(loggedAt).getTime() > (60 * 30 * 1000);
  }
}

module.exports = User;
