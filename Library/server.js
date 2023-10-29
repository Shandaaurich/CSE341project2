//express web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//require the mongoDb file that has the connection to MongoDB
const mongodb = require('./db/connect');
//use mongoose to connect to MongoDB
const mongoose = require('mongoose');

const passport = require('./config/passport-setup');

const routes = require('./routes');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

//create home route
app.get('/', (req, res) => {
    res.render('home');
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

// connect to mongodb
mongoose.connect(process.env.MOGOOSEDB_URI)

//connect to MongoDB instance, show error in console or display connected message

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Web server listening on port ' + (port));
    }
});