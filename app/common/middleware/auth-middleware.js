const jwt = require('jsonwebtoken');

const config = require('../../config');

module.exports = (req, res, next) => { // eslint-disable-line consistent-return
  const xapptoken = req.headers['x-access-token'];

  if (!xapptoken) {
    return res.status(403).json({ message: 'Não Autorizado' });
  }

  const bearer = xapptoken.split(' ');
  const token = bearer[1];

  jwt.verify(token, config.app.secret, (err) => { // eslint-disable-line consistent-return
    if (err) {
      return res.status(403).json({ message: 'Não Autorizado' });
    }

    next();
  });
};
