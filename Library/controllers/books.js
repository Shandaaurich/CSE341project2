//connect to MongoDB
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all data from books collection
const getData = async (req, res, next) => {
    //wait for connection find()everything inside
    const result = await mongodb.getDb().db().collection('books').find();
    //return as an array and loop through
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//get only the collection object with the ObjectId
const getData1 = async (req, res, next) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('books').find({ _id: bookId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

// //add a book to the collection

const createbook = async (req, res, next) => {
    try {
        const bookSchema = {

            title: req.body.title,
            author: req.body.author,
            date_published: req.body.date_published,
            page_number: req.body.page_number,
            genre: req.body.genre,
            isbn: req.body.isbn,
            series: req.body.series

        };
        const result = await mongodb.getDb().db().collection('books').insertOne(bookSchema);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json(result.error || "Did not create the book")
        }
    } catch (err) {
        res.status(500).json(err);
    }

};

const editbook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {

            title: req.body.title,
            author: req.body.author,
            date_published: req.body.date_published,
            page_number: req.body.page_number,
            genre: req.body.genre,
            isbn: req.body.isbn,
            series: req.body.series

        };
        const result = await mongodb.getDb().db().collection('books').replaceOne({ _id: bookId }, book); {
            if (result.modifiedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json(result.error || "Did not update the book")
            }
        };
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletebook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId }, true);

    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || "Did not delete the book");
    }
};


//export the data from the db
module.exports = {
    getData, getData1, createbook, editbook, deletebook
};