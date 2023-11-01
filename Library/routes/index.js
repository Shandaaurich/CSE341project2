const routes = require('express').Router();

//dotenv package to access environment file
const dotenv = require('dotenv');
dotenv.config();

//Auth0 authentication
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env['AuthSecret'],
  baseURL: 'http://localhost:8080',
  clientID: process.env['AuthClientID'],
  issuerBaseURL: 'https://dev-msbr740eu250r17d.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));

// req.isAuthenticated is provided from the auth router
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

routes.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// routes.use('/auth', require('./auth-routes'));
routes.use('/', require('./swagger'));
routes.use('/books', require('./books'));
routes.use('/series', require('./series'));
routes.use('/users', require('./users'));

module.exports = routes;