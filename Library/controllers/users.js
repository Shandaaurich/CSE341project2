//connect to MongoDB
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const passwordCheck = require('../util/passwordCheck');

//get all data from users collection
const getData = async (req, res, next) => {
    //wait for connection find()everything inside
    const result = await mongodb.getDb().db().collection('users').find();
    //return as an array and loop through
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//get only the collection object with the ObjectId
const getData1 = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

// //add a user to the collection

const createuser = async (req, res, next) => {
    try {
        const userschema = {

            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email

        };
        const result = await mongodb.getDb().db().collection('users').insertOne(userschema);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json(result.error || "Did not create the user")
        }
    } catch (err) {
        res.status(500).json(err);
    }

};

const edituser = async (req, res, next) => {
    try {
    const userId = new ObjectId(req.params.id);
    const user = {

        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email

    };
    const result = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user); {
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "Did not update the user")
        }
    };
} catch (err) {
    res.status(500).json(err);
}
};

const deleteuser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId }, true);

    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || "Did not delete the user");
    }
};


//export the data from the db
module.exports = {
    getData, getData1, createuser, edituser, deleteuser
};