const { MongoClient } = require('mongodb');

const factory = (state, mongoClient = MongoClient) => ({
  connect(url, dbName) {
    return mongoClient.connect(url, {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
    }).then((client) => {
      state.db = client.db(dbName); // eslint-disable-line 
      return state.db;
    });
  },

  isConnected() {
    return state.db && state.db.serverConfig && state.db.serverConfig.isConnected();
  },

  disconnect() {
    state.db.serverConfig.close();
    state.db = null; // eslint-disable-line 
    return state.db;
  },

  collection(collectionName) {
    if (state.db) return state.db.collection(collectionName);
    throw new Error('There is no connection to the database.');
  },

  db() {
    return state.db;
  },
});

module.exports = factory;
