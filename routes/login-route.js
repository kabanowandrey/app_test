const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/* GET users listing. */
router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLoginData);

module.exports = router;


