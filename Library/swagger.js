const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Library API',
    description: 'A collection of personal titles and series in my personal library'
  },
  host: 'localhost:8080',
  schemes: ['http'],
  books: {
    _id: 1,
    title: 'Title',
    author: 'Author',
    date_published: 1945,
    page_number: 180,
    genre: 'Classic',
    ISBN: 978-0-7432-7356-5,
    series: 'The Lord of the Rings'},

  series: {
    _id: 1,
    Series: 'The Lord of the Rings',
    Author: 'J.R.R. Tolkien',
    Number_of_Books: 3,
    Genre: 'Fantasy'
  }

};


const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });