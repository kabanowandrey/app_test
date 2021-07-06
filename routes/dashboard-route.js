const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const router = express.Router();

// GET users listing
router.get('/dashboard', function(req, res, next) {
    if(req.session.loggedinUser){
        res.render('dashboard', {
            email:req.session.emailAddress,
            name: req.session.real_name
        });
    }else {
        res.redirect('/login');
    }
});

module.exports = router;