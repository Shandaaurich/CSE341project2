//connect to MongoDB
const mongodb = require('../models');
const Series = mongodb.series;

//get all data from series collection
exports.getData = (req,res) => {
    Series.find({})
    .then((data) => {res.send(data);})
    .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving series.'
        });
      });
};


//get only the collection object with the ObjectId
exports.getData1 = (req, res) => {
    const seriesId = req.params.series_id;
    Series.find({series_id: seriesId})
    .then((data) => {res.send(data);})
    .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving series.'
        });
      });
};