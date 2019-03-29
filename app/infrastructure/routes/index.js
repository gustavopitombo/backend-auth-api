const authRouter = require('./auth');
const userRouter = require('./user');

const routes = {
  authRouter,
  userRouter,
};

module.exports = (app) => {
  app.use('/v1/auth', routes.authRouter());
  app.use('/v1/user', routes.userRouter());

  return app;
};
