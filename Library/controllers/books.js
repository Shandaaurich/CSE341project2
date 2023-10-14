//connect to MongoDB
const mongodb = require('../models');
const Books = mongodb.books;

//get all data from books collection
exports.getData = (req,res) => {
    Books.find({})
    .then((data) => {res.send(data);})
    .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving books.'
        });
      });
};


//get only the collection object with the ObjectId
exports.getData1 = (req, res) => {
    const bookId = req.params.book_id;
    Books.find({book_id: bookId})
    .then((data) => {res.send(data);})
    .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving book.'
        });
      });
};