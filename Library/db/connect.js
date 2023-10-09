//dotenv package to access environment file
const dotenv = require('dotenv');

dotenv.config();

//Mongo client configuration
const MongoClient = require('mongodb').MongoClient;

let _db;

//if _db has been given a value then return callback
const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
//if not then connect to the database and the assign it to the variable
    MongoClient.connect(process.env.MONGODB_URI).then((client) => {
        _db = client;
        callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

//if there is not a _db then throw an error otherwise return the db connection
const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
  };