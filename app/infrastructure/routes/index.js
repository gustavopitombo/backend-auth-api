const authRouter = require('./auth');

const routes = {
  authRouter,
};

module.exports = (app) => {
  app.use('/v1/auth', routes.authRouter());

  return app;
};
