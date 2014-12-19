var express = require('express');
var router = express.Router();
var dbAccess = require('../lib/db/dbAccess.js');


router.get('/create', function(req, res) {
  res.render('create', { title: 'Make an Account' });
});

router.post('/auth', function(req, res) {
  // TDR: redirect if logged in:
  var user = req.session.user;
  if (user !== undefined) {
    res.redirect('/');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    var retypedPassword = req.body.retypedPassword;
    if(password === retypedPassword){
      // Perform the user lookup.
      dbAccess.createNewUser(username, password, function(error, success, newUser) {
        if(error) {
          console.log(error);
          req.flash('auth', error);
          res.redirect('/create');
        }
        else {
          if(success){
            //req.session.user = newUser; 
      	    res.redirect('/');
          }
          else{
            req.flash('auth', "There is already a user with that name!");
            res.redirect('/create');
          }
        }
      });
    }
    else{
      req.flash('auth', "Passwords do not match!");
      res.redirect('/create');
    }
  }
});

module.exports = router;