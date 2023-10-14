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
    const bookId = req.params._id;
    Books.find({_id: bookId})
    .then((data) => {res.send(data);})
    .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving book.'
        });
      });
};











// //connect to MongoDB
// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

// //get all data from books collection
// const getData = async (req, res, next) => {
//     //wait for connection find()everything inside
//     const result = await mongodb.getDb().db().collection('books').find();
//     //return as an array and loop through
//     result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists);
//     });
// };

// //get only the collection object with the ObjectId
// const getData1 = async (req, res, next) => {
//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb.getDb().db().collection('books').find({ _id: userId });
//     result.toArray().then((lists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//     });
// };

// // //add a book to the collection
// const createbook = async (req, res, next) => {
//     const bookSchema = {

//         title: req.body.title,
//         author: req.body.author,
//         date_published: req.body.date_published,
//         page_number: req.body.page_number,
//         genre: req.body.genre,
//         ISBN: req.body.ISBN,
//         series: req.body.series

//     };
//     const result = await mongodb.getDb().db().collection('books').insertOne(bookSchema);
//     if (result.acknowledged) {
//         res.status(201).json(result);
//     } else {
//         res.status(500).json(result.error || "Did not create the book")
//     }

// };

// const editbook = async (req, res, next) => {
//     const bookId = new ObjectId(req.params.id);
//     const book = {

//         title: req.body.title,
//         author: req.body.author,
//         date_published: req.body.date_published,
//         page_number: req.body.page_number,
//         genre: req.body.genre,
//         ISBN: req.body.ISBN,
//         series: req.body.series

//     };
//     const result = await mongodb.getDb().db().collection('books').replaceOne({ _id: bookId }, book); {
//         if (result.modifiedCount > 0) {
//             res.status(204).send();
//         } else {
//             res.status(500).json(result.error || "Did not update the book")
//         }
//     };
// };

// const deletebook = async (req, res) => {
//     const bookId = new ObjectId(req.params.id);
//     const result = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId }, true);

//     if (result.deletedCount > 0) {
//         res.status(200).send();
//     } else {
//         res.status(500).json(result.error || "Did not delete the book");
//     }
// };


// //export the data from the db
// module.exports = {
//     getData, getData1, createbook, editbook, deletebook
// };