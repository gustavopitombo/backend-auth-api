const express = require('express');
const bodyParser = require('body-parser');
const buildRoutes = require('./app/infrastructure/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

buildRoutes(app);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
