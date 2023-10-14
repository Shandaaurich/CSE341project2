const dbConnect = require('../db/connect');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConnect.url;
db.books = require('./books.js')(mongoose);
db.series = require('./series.js')(mongoose);

module.exports = db;