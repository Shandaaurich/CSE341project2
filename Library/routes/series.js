const express = require('express');

//data from db
const series = require('../controllers/series');

const router = express.Router();

//if we hit this route: localhost:8080/series/, then call a funtion in the controller folder (series is the url)
//getting all the series from the collection
router.get('/', series.getData);

//getting only the series with the specified id
router.get('/:id', series.getData1);

// //adding a new series
// router.post('/', series.createseries);

// //edit a series by id
// router.put('/:id', series.editseries);

// //delete a series by id
// router.delete('/:id', series.deleteseries);


module.exports = router;