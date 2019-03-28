const { MongoClient } = require('mongodb');

const state = {
  db: null,
};

const mongodb = {
  connect(url, dbName) {
    return MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {
      state.db = client.db(dbName);

      return this.state.db;
    });
  },

  collection(collectionName) {
    if (state.db) return state.db.collection(collectionName);

    throw new Error('There is no connection to the database.');
  },

  db() {
    return state.db;
  },
};

module.exports = mongodb;
