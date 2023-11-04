const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect');


routes.use('/', require('./swagger'));
routes.use('/books', requiresAuth(), require('./books'));
routes.use('/series', requiresAuth(), require('./series'));
routes.use('/users',  requiresAuth(), require('./users'));

module.exports = routes;