//express web server
const express = require('express');
const bodyParser = require('body-parser');

//change the port 8080 to support the production port
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/', require('./routes'))

const db = require('./models/index');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });


// // const MongoClient = require('mongodb').MongoClient;
// //require the mongoDb file that has the connection to MongoDB
// const mongodb = require('./db/connect');
// // const routes = require('./routes');


// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// //routes in a separate file to keep the server file lean
// app.use('/', routes);

// //connect to MongoDB instance, show error in console or display connected message
// mongodb.initDb((err, mongodb) => {
//     if (err) {
//         console.log(err);
//     } else {
//         app.listen(port);
//         console.log('Web server listening on port ' + (port));
//     }
// });