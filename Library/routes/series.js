const express = require('express');

//data from db
const series = require('../controllers/series');

//validation for series schema
const { seriesValidation, idValidationRule, validate } = require('../validation');

const router = express.Router();

//if we hit this route: localhost:8080/series/, then call a funtion in the controller folder (series is the url)
//getting all the series from the collection
router.get('/', series.getData);

//getting only the series with the specified id
router.get('/:id', series.getData1);

//adding a new series
router.post('/', seriesValidation(), validate, series.createseries);

//edit a series by id
router.put('/:id', seriesValidation(), validate, series.editseries);

//delete a series by id
router.delete('/:id', idValidationRule(), validate, series.deleteseries);


module.exports = router;