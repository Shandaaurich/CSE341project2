//express web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//change the port 8080 to support the production port
const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
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
