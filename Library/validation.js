const { param, check, validationResult } = require('express-validator');

exports.bookValidation = () => {
    return [
        check('title', 'Title is required').not().isEmpty(),
        check('author', 'Author is required').not().isEmpty(),
        check('date_published', 'Date published is required').not().isEmpty,
        check('isbn', 'ISBN is not valid').not().isEmpty().isISBN(),
        check('series', 'If not part of a series type N/A').not().isEmpty
    ];
}

exports.idValidationRule = () => {
    return [
      param('id', 'id is required to be 24-chars').isLength(24)
    ];
  }

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    console.log(errors.array());
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }