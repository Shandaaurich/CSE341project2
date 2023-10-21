const { param, check, validationResult } = require('express-validator');

exports.bookValidation = () => {
    return [
        check('title', 'Title is required').not().isEmpty(),
        check('author', 'Author is required').not().isEmpty(),
        check('date_published', 'Date published is required').not().isEmpty,
        check('ISBN', 'ISBN is not valid').not().isEmpty().isISBN(),
        check('series', 'If not part of a series type N/A').not().isEmpty
    ];
}

exports.userValidation = () => {
  return [
    check('username', 'firstName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true })
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