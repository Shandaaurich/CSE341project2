const express = require('express');

//data from db
const series = require('../controllers/series');

const router = express.Router();

//if we hit this route: localhost:8080/series/, then call a funtion in the controller folder (series is the url)
//getting all the series from the collection
router.get('/', series.getData);

//getting only the series with the specified id
router.get('/:id', series.getData1);

//adding a new series
router.post('/', series.createseries);
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

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday

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

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday

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
//edit a series by id
router.put('/:id', series.editseries);

//delete a series by id
router.delete('/:id', series.deleteseries);


module.exports = router;