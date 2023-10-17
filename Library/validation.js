const { check } = require('express-validator');

exports.bookValidation = [
    check('isbn', 'ISBN is not valid').isISBN()
]