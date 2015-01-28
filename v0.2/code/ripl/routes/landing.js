var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('landing', { title: 'Ripl.me' });
});


router.post('/signup', function(req, res) {
	var lname = req.body.lname;
	var fname = req.body.fname;
	var email = req.body.email;
	console.log('lname=' + lname);
	console.log('fname=' + fname);
	console.log('email=' + email);
	res.json({status : "OK"});
});
module.exports = router;