const express = require('express');

//data from db
const books = require('../controllers/books');

const router = express.Router();

//if we hit this route: localhost:8080/books/, then call a function in the controller folder (books is the url)
//getting all the books from the collection
router.get('/', books.getData);

//getting only the book with the specified id
router.get('/:id', books.getData1);

//adding a new book
router.post('/', books.createbook);

//edit a book by id
router.put('/:id', books.editbook);

//delete a book by id
router.delete('/:id', books.deletebook);


module.exports = router;