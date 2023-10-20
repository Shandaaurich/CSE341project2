const express = require('express');

//data from db
const books = require('../controllers/books');

const router = express.Router();
const cors = require('cors')

//validation for book schema
const { bookValidation, idValidationRule, validate } = require('../validation');

const corsOptions = {
    origin: '*'
  }

//if we hit this route: localhost:8080/books/, then call a function in the controller folder (books is the url)
//getting all the books from the collection
router.get('/', books.getData);

//getting only the book with the specified id
router.get('/:id', cors(corsOptions), idValidationRule(), bookValidation, books.getData1, validate);

//adding a new book
router.post('/', cors(corsOptions), idValidationRule(), bookValidation, books.createbook, validate);

//edit a book by id
router.put('/:id', cors(corsOptions), idValidationRule(), bookValidation, books.editbook, validate);

//delete a book by id
router.delete('/:id', cors(corsOptions), idValidationRule(), bookValidation, books.deletebook, validate);


module.exports = router;