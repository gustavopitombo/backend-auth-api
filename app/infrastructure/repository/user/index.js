class UserRepository {
  constructor(database, collectionName) {
    this.collection = collectionName;
    this.db = database;
  }

  findBydId(userId) {
    return this.db.collection(this.collection).findOne({ userId });
  }

  insert(user) {
    return this.db.collection(this.collection)
      .insertOne(user)
      .then(result => result.ops[0]);
  }
}

module.exports = UserRepository;
