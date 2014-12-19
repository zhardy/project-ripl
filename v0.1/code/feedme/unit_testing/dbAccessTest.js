var dbAccess = require('../lib/db/dbAccess.js');



// dbAccess.userExists('test', function (err, userexists){
// 	if (err){
// 		console.log(err);
// 	}
// 	else{
// 		if (userexists === true){
// 			console.log('THE USER EXISTS!');
// 		}
// 		if (userexists === false){
// 			console.log('THE USER DOES NOT EXIST!');
// 		}
// 	}
// });

// dbAccess.processQuery('add user', ['mike'], function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });


// dbAccess.sourceExists("http://reddit.com/.rss", function (err, source_exists){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		if (source_exists === true){
// 			console.log('THE SOURCE EXISTS!');
// 		}
// 		if (source_exists === false){
// 			console.log('THE SOURCE IS NOT IN DATABASE!');
// 		}
// 	}
// });

// dbAccess.getUserID('test', function (err, response){
// 	if (err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });



// dbAccess.getSourceID('http://www.reddit.com/.rss', function (err, sourceID){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(sourceID);
// 	}
// });


// dbAccess.processQuery('get user feeders', [1], function (err, result){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(result);
// 	}
// });




// dbAccess.getUserID('test', function (err, userID){
// 	if (err){
// 		console.log(err);
// 	}
// 	else{
// 			dbAccess.getSourceID( 'http://feeds.feedburner.com/Explosm', function (err, sourceID){
// 				if(err){
// 				console.log(err);
// 			}
// 				else{
// 				dbAccess.subscribeUserToSource(userID, sourceID, function(err, success){
// 					if(err){
// 						console.log(err);
// 					}
// 					else{
// 						console.log(success)
// 					}
// 				});
// 			}
// 	});

		
// 	}
// });


// dbAccess.processQuery('add source', ['http://feeds.feedburner.com/Explosm'], function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });



// dbAccess.userHasPassword(1, function (err, response){
// 	if(err){
// 		console.log('You dun goof\'d');
// 	}
// 	else{
// 		if(response === true){
// 			console.log('User Has Password!');
// 		}
// 		if(response === false){
// 			console.log('User Does Not Have Password');
// 		}
// 	}
// });

// dbAccess.processQuery('add new user', ['test'], function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.processQuery('get user id', ['test'], function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		dbAccess.processQuery('set password', [response, 'test'], function (error, success){
// 			if(error){
// 				console.log(error);
// 			}
// 			else{
// 				console.log(success);
// 			}
// 		});
// 	}
// });

// dbAccess.setUserPassword(1, 'new_password', function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });



// dbAccess.getUserPassword(1, function (err, response){
// 	if (err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });


// dbAccess.subscribeUserToSource(1, 3, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.unsubscribeUserFromSource(1, 1, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.userAlreadySubscribedFeeder(1, 2, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		if (response === true){
// 			console.log('User Already Subscribed To Feeder!');
// 		}
// 		if (response === false){
// 			console.log('User Not Subscribed To Feeder!');
// 		}
// 	}
// });

// dbAccess.addUser('tim', function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.subscribeUserToFeeder(1, 1, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.unsubscribeUserFromFeeder(1, 1, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.getUsersSources(1, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });

// dbAccess.getFeedersSubscribedTo(1, function (err, response){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(response);
// 	}
// });