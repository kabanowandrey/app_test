const express = require('express');
const router = express.Router();
const  registrationController = require('../controllers/registrationController');
const dataValidator = require('../middleware/dataValidator');
db = require('../config/db.config');
bcrypt = require('bcryptjs');


// to display registration form
router.get('/' , registrationController.registrationGetData);

    // to store user input detail on post request
router.post('/', dataValidator.dataValidationRegister , registrationController.registrationPostData);

module.exports = router;

