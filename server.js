const express = require('express');
const bodyParser = require('body-parser');
const config = require('./app/config');
const buildRoutes = require('./app/infrastructure/routes');
const mongodb = require('./app/common/lib/mongodb');

const initApp = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());

  try {
    const mongoConnect = await mongodb.connect(config.mongo.uri, config.mongo.base);

    if (!mongoConnect) {
      throw new Error('Mongo failed to connect');
    }

    console.warn('mongoConnect', mongoConnect);
  } catch (error) {
    console.log(`App failed ${error.message}`);

    return;
  }

  buildRoutes(app);

  app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });
};

initApp();
