const config = {
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/heroku_q5g0hthp',
    base: process.env.MONGODB_BASE || 'heroku_q5g0hthp',
    userCollection: 'user',
  },
};

module.exports = config;
