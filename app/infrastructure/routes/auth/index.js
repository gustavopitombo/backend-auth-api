const express = require('express');
const { Adapter, Handler } = require('../../../common');
const LoginFactory = require('../../factory/auth/login-factory');
const RegisterFactory = require('../../factory/auth/register-factory');

const router = () => {
  const authRouter = express.Router();

  authRouter.route('/login').get(Adapter(LoginFactory, Handler));
  authRouter.route('/register').get(Adapter(RegisterFactory, Handler));

  return authRouter;
};

module.exports = router;
