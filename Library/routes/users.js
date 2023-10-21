const express = require('express');

//data from db
const users = require('../controllers/users');
const { idValidationRule, userValidation, validate } = require('../validation');

const router = express.Router();

//if we hit this route: localhost:8080/users/, then call a funtion in the controller folder (users is the url)
//getting all the users from the collection
router.get('/', users.getData);

//getting only the users with the specified id
router.get('/:id', users.getData1);

//adding a new users
router.post('/', userValidation(), validate, users.createuser);

//edit a users by id
router.put('/:id', userValidation(), validate, users.edituser);

//delete a users by id
router.delete('/:id', idValidationRule(), validate, users.deleteuser);


module.exports = router;