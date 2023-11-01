const routes = require('express').Router();

//Auth0 authentication
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '7f00JPEb4i28uyhIEfraVR3vnB5IE_yF_5x-gAY_w97wZxkCiSA1EIyeXdVCy95S',
  baseURL: 'http://localhost:8080',
  clientID: '5X1Y6EEDOBiysAU6TcHC3jKlURwT6wAx',
  issuerBaseURL: 'https://dev-msbr740eu250r17d.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));

// req.isAuthenticated is provided from the auth router
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.use('/auth', require('./auth-routes'));
routes.use('/', require('./swagger'));
routes.use('/books', require('./books'));
routes.use('/series', require('./series'));
routes.use('/users', require('./users'));

module.exports = routes;