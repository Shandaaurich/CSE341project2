//express web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//require the mongoDb file that has the connection to MongoDB
const mongodb = require('./db/connect');

const routes = require('./routes');

//dotenv package to access environment file
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//set up view engine
app.set('view engine', 'ejs');

//create home route
app.get('/', (req, res) => {
    res.render('home');
});

const { auth } = require('express-openid-connect');
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

  // Secured route
app.get('/profile', (req, res) => {
    // Requires authentication
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send('Not logged in');
    }
    res.send(JSON.stringify(req.oidc.user));
  });

//change the port 8080 to support the production port
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With, Content-Type, Accept, Z-Key');
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});


//routes in a separate file to keep the server file lean
app.use('/', routes);


//connect to MongoDB instance, show error in console or display connected message

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Web server listening on port ' + (port));
    }
});