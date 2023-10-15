// //connect to MongoDB
// const mongodb = require('../models');
// const Series = mongodb.series;

// //get all data from series collection
// exports.getData = (req,res) => {
//     Series.find({})
//     .then((data) => {res.send(data);})
//     .catch((err) => {
//         res.status(500).send({
//           message: err.message || 'Some error occurred while retrieving series.'
//         });
//       });
// };


// //get only the collection object with the ObjectId
// exports.getData1 = (req, res) => {
//     const seriesId = req.params.series_id;
//     Series.find({series_id: seriesId})
//     .then((data) => {res.send(data);})
//     .catch((err) => {
//         res.status(500).send({
//           message: err.message || 'Some error occurred while retrieving series.'
//         });
//       });
// };

// //add a series to the collection
// exports.createSeries = (req, res) => {
//   const newSeries = Series(req.body);
//   newSeries.save()
//   .then((data) => {
//     res.status(201).send(data);
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message: err.message || 'Some error occurred while adding series.'
//   });
// });
// };



//connect to MongoDB
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all data from series collection
const getData = async (req, res, next) => {
    //wait for connection find()everything inside
    const result = await mongodb.getDb().db().collection('series').find();
    //return as an array and loop through
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//get only the collection object with the ObjectId
const getData1 = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('series').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

// //add a series to the collection
const createseries = async (req, res, next) => {
    const seriesschema = {

        series: req.body.series,
        author: req.body.author,
        email: req.body.email,
        number_of_books: req.body.number_of_books,
        genre: req.body.genre

    };
    const result = await mongodb.getDb().db().collection('series').insertOne(seriesschema);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || "Did not create the series")
    }

};

const editseries = async (req, res, next) => {
    const seriesId = new ObjectId(req.params.id);
    const series = {

        series: req.body.series,
        author: req.body.author,
        email: req.body.email,
        number_of_books: req.body.number_of_books,
        genre: req.body.genre

    };
    const result = await mongodb.getDb().db().collection('series').replaceOne({ _id: seriesId }, series); {
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "Did not update the series")
        }
    };
};

const deleteseries = async (req, res) => {
    const seriesId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('series').deleteOne({ _id: seriesId }, true);

    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || "Did not delete the series");
    }
};


//export the data from the db
module.exports = {
    getData, getData1, createseries, editseries, deleteseries
};