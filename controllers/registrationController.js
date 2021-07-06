db = require('../config/db.config');
bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');



exports.registrationGetData = function(req, res, next) {
    db.query('SELECT * FROM countries', function(err, datacountry) {
        if(err) throw err
        console.log(datacountry);
        res.render('registration-form', {
            countries: datacountry
        });
    });    
};





exports.registrationPostData = function(req, result, next) {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let errMsgs= errors.mapped();
            let inputfields = matchedData(req);  
            
                 db.query('SELECT * FROM countries', function(err, datacountry) {
                result.render('registration-form', {
                    alertMsg: "Field filled incorect",
                    countries: datacountry
                    
                });    
            });
            console.log(errors)
        } else {
                // Hash password
          bcrypt.genSalt(7, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
  
  
      const inputData = {
          email_address: req.body.email_address,
          login: req.body.login,
          real_name: req.body.real_name,
          password: hash,
          birth_date: req.body.birth_date,
          country: req.body.countries,
          agree: req.body.agree,
          created_at : Math.round((new Date()).getTime()/1000),
      }
      console.log(inputData);
  
      
  
      var sql = 'SELECT email_address, login FROM registrations WHERE email_address =? OR login =?';
      db.query(sql, [inputData.email_address, inputData.login], function(err, data) {
          if(err) throw err 
          if(data.length>0) {
  
              //var msg = inputData.email_address+ "was already exist";
              
              db.query('SELECT * FROM countries', function(err, datacountry) {
                  if(err) throw err
                  console.log(datacountry);
                  result.render('registration-form', {
                      alertMsg: "Your email or login already exist",
                      countries: datacountry
                  });    
              });
              console.log('This email already exist');
              //return result.send("<script> alert('email already exist'); window.location = '/register'; </script>")
          } else {
              var sql = 'INSERT INTO registrations SET ?';
              db.query(sql, inputData, function(err, data) {
                  if(err) throw err
                  console.log(data)
                      if(data) {
                          req.session.loggedinUser= true;
                          req.session.emailAddress= inputData.email_address;
                          req.session.real_name = inputData.real_name;
                          console.log('Welcome in your account');
                          result.redirect('/dashboard');
                          }
                      }); 
                  }
              }); 
          });
      });
    }
};