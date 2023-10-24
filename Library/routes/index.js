const routes = require('express').Router();


routes.use('/auth', require('./auth-routes'));
routes.use('/', require('./swagger'));
routes.use('/books', require('./books'));
routes.use('/series', require('./series'));
// routes.use('/users', require('./users'));

module.exports = routes;