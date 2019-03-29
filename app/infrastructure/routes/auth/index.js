const express = require('express');
const { Adapter } = require('../../../common');

const LoginFactory = require('../../factory/auth/login-factory');
const LoginHandler = require('../../http/auth/login-handler');
const RegisterFactory = require('../../factory/auth/register-factory');
const RegisterHandler = require('../../http/auth/register-handler');

const authMiddleware = require('../../../common/middleware/auth-middleware');

const router = () => {
  const authRouter = express.Router();

  authRouter.route('/login').post(Adapter(LoginFactory, LoginHandler));
  authRouter.route('/register').post(Adapter(RegisterFactory, RegisterHandler));

  return authRouter;
};

module.exports = router;
