const { auth } = require('express-openid-connect');
const express = require('express');

const dotenv = require('dotenv');
const app = express();

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AuthSecret,
  baseURL: 'http://localhost:8080',
  clientID: process.env.AuthClientID,
  issuerBaseURL: 'https://dev-msbr740eu250r17d.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});