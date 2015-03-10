var express = require('express');
var router = express.Router();
var rss	   = require('resource');
var db    = require('../lib/db/dbAccess.js');


router.get('/', function(req, res) {
	var user = req.session.user;
	var items;
	var feeders;
	var userFilters;
	var sources;
	

	if(user !== undefined){
		db.processQuery('get user sources', [user.uid], function (err, sourceArray){
			if(sourceArray.length <= 0){
				sources = undefined;
				items = undefined;
				userFilters = undefined;
				db.feeders(user.uid, function (err, feedersFromDB){
					if(feedersFromDB.length <= 0){
						feeders = undefined;
						res.render('index', {items:items, feeders: feeders, sources: sources, filters:userFilters});
					}
					else{
						feeders = feedersFromDB;
						res.render('index', {items:items, feeders: feeders, sources: sources, filters:userFilters});
					}
				});
			}
			else{
				sources = sourceArray;
				var tempArray = [];
				sourceArray.forEach ( function (entry){
					tempArray.push(entry.sourcelink);
				});
				rss.feed(tempArray, undefined, function(articleArray){

					items = articleArray;
					db.filters(user.uid, function (err, filters){
						if(err){
							console.log(err);
						}
						else{
							if(filters === undefined){
								userFilters === undefined;
								db.feeders(user.uid, function (err, feedersFromDB){
									if(feedersFromDB.length <= 0){
										feeders = undefined;
										res.render('index', {items:items, feeders: feeders, sources: sources, filters:userFilters});
									}
									else{
										feeders = feedersFromDB;
										res.render('index', {items:items, feeders: feeders, sources: sources, filters:userFilters});
									}
									});
							}
							else{

								rss.filtersFeed(filters, function (finalFilters){
									userFilters = finalFilters;
									db.feeders(user.uid, function (err, feedersFromDB){
									if(feedersFromDB.length <= 0){
										feeders = undefined;
										res.render('index', {items:items, feeders: feeders, sources: sources, filters:userFilters});
									}
									else{

										feeders = feedersFromDB;
										res.render('index', {items:items, feeders: feeders, sources: sources, filters:userFilters});
									}
									});
		
								});
							}
						}
					});
				});
			}
			});
	}
	else{
		res.redirect('/login');
	}
});

	
router.get('/login', function(req, res){
  var authmessage = req.flash('auth') || '';
  res.render('login', { title: 'Login Page', message: authmessage });
});

router.get('/logout', function(req, res) {
  var user = req.session.user;
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
    return;
  }
  
  delete req.session.user;
  res.redirect('/login');
});

router.get('/create', function(req, res){
  var authmessage = req.flash('auth') || '';
  res.render('create', { title: 'Signup Page', message: authmessage });
});

router.post('/filterForm', function(req, res){

	var user = req.session.user;
	var filterSources = req.body.filterSources;
	var filterName = req.body.filterName;
	db.processQuery('add filter', [user.uid, filterSources, filterName], function (err, sourceArray){
		if(err){
			console.log(err);
		}
		else{
		}



		});
	res.redirect('/');



	
});

router.post('/newSource', function(req, res){
	var user = req.session.user;
	var newSource = req.body.newSource;


	db.processQuery('add source', [newSource], function (errorAdd, sourceExistsAlready){
		if(errorAdd){
			console.log(errorAdd);
		}
		else{
		db.getSourceID(newSource, function (errorID, sourceID){
			if(errorID){
				console.log(errorID);
			}
			else{
			db.processQuery('subscribe to source', [user.uid, sourceID], function (errorSub, success){
				if(errorSub){
					console.log(errorSub);
				}
				else{
					console.log(success);
				}
			});
		}
		});
	}
	});
	setTimeout(function (){
		res.redirect('/');
	}, 1000);
});

router.post('/newFeeder', function(req, res){
	var user = req.session.user;
	var newFeeder = req.body.newFeederName;
	db.processQuery('get user id', [newFeeder], function (errorGettingID, userID){
		if(errorGettingID){
			console.log(errorGettingID);
		}
		else{
			db.processQuery('subscribe to feeder', [user.uid, userID], function (errorSubscribingToFeeder, success){
				if(errorSubscribingToFeeder){
					console.log(errorSubscribingToFeeder);
				}
				else{
					res.json({newFeederID: userID});
				}
			});
		}
	});
});

router.post('/feeder', function(req, res){

	var id = req.body.feederID;
	db.processQuery('get user sources', [id], function (err, sourceArray){
		var tempArray = [];

		sourceArray.forEach ( function (entry){
		tempArray.push(entry.sourcelink);
		});

		rss.feed(tempArray, undefined, function (finalArticles){
			res.json({articles : finalArticles});
			
		});
	});
});



module.exports = router;
