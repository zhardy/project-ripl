var express = require('express');
var router = express.Router();
var dbAccess = require('../lib/db/dbAccess.js');


router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';
  console.log(authmessage);

  // TDR: redirect if logged in:
  var user  = req.session.user;




  if (user !== undefined) {
    res.redirect('/');
  }
  else {

    // Render the login view if this is a new login.
    res.render('login', { title   : 'User Login',
                          message : authmessage });
  }
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
    // Perform the user lookup.

    dbAccess.checkPassword(username, password, function(error, validUser, thisUser) {

      if(error) {
        console.log(error);
        req.flash('auth', error);
        res.redirect('/login');
      }
      else {
        if(validUser) {
          req.session.user = thisUser;
          res.redirect('/');
        }
        else {
          req.flash('auth', 'Username and password did not match');
          res.redirect('/login');
        }
      }
    });
  }
});

module.exports = router;