const db=require('../config/db.config');
const bcrypt = require('bcryptjs');


exports.getLogin = function(req, res, next) {
    res.render('login-form');
  };


exports.postLoginData = function(req, res, next){

    //const emailAddress = req.body.email_address;
    //const login = req.body.login;

    const emailAddress = req.body.auth;
    const login = emailAddress;

    const login_password = req.body.password; 
    var sql = 'SELECT password FROM registrations WHERE email_address =? OR login =?';
    
    db.query(sql, [emailAddress, login], function(err, result) {
        console.log(result);
        if (err) throw err
        if(result.length>0) {

            const validPassword = bcrypt.compareSync(login_password, result[0].password);
            if(!validPassword) {
                //console.log("Password not Matched");                
                res.render('login-form',{alertMsg:"Your Email Address or password is wrong"});
            } else {
                //console.log("Password Matched");
                //console.log(result[0].password)
                //res.render('login-form', {alertMsg: "You login succesfull"});

                var sql = 'SELECT real_name, email_address FROM registrations WHERE email_address =? OR login =?';    
                    db.query(sql, [emailAddress, login], function(err, data) {
                        if(err) throw err
                            if(data.length>0){
            
                                req.session.loggedinUser= true;
                                req.session.emailAddress= data[0].email_address;
                                req.session.real_name = data[0].real_name;
                                res.redirect('/dashboard');
                    }
                });
            }
        }
    });
};

