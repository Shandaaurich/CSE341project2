const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/books', require('./books'));
routes.use('/series', require('./series'));

module.exports = routes;