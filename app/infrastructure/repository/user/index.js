class UserRepository {
  constructor(database, collectionName) {
    this.collection = collectionName;
    this.db = database;
  }

  find(filter) {
    return this.db.collection(this.collection).findOne(filter);
  }

  insert(user) {
    return this.db.collection(this.collection)
      .insertOne(user)
      .then(result => result.ops[0]);
  }

  update({ _id, loggedAt }) {
    return this.db.collection(this.collection)
      .updateOne({ _id }, { $set: { loggedAt } })
      .then(result => result);
  }
}

module.exports = UserRepository;
