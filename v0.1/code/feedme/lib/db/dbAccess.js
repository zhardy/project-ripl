var querystring = require('querystring');
var pg = require('pg');
var rss = require('resource');

var connString = "postgres://feedme:feedme@localhost/feedme";

function User(username, uid) {
  this.username = username;
  this.uid      = uid;
}

function Filter(filterName, arrayOfSources, arrayOfArticles) {
  this.filterName = filterName;
  this.arrayOfSources = arrayOfSources;
  this.arrayOfArticles = arrayOfArticles; 

}

function Feeder(User, arrayOfSources, arrayOfArticles){
	this.User = User;
	this.arrayOfSources = arrayOfSources;
	this.arrayOfArticles = arrayOfArticles;
}



function processQuery(query, arguments, callback){
	switch (query){
		case 'check exist':
			userExists(arguments[0], callback); // takes as input a username
			break;
		case 'add source':
			addSource(arguments[0], callback); // takes as input a sourceLink
			break;
		case 'get user id':
			getUserID(arguments[0], callback); // takes as input a username
			break;
		case 'get user sources':
			getUserSources(arguments[0], callback); // takes as input a userID
			break;
		case 'set password':
			setUserPassword(arguments[0], arguments[1], callback); // takes as inputs a userID and password
			break;
		case 'get password':
			getUserPassword(arguments[0], callback); // takes as input a userID
			break;
		case 'subscribe to source':
			subscribeUserToSource(arguments[0], arguments[1], callback); // takes as inputs a userID and a sourceID
			break;
		case 'unsubscribe from source':
			unsubscribeUserFromSource(arguments[0], arguments[1], callback); // takes as inputs a userID and a sourceID
			break;
		case 'subscribe to feeder':
			subscribeUserToFeeder(arguments[0], arguments[1], callback); // takes as inputs a userID and a feederID
			break;
		case 'unsubscribe from feeder':
			unsubscribeUserFromFeeder(arguments[0], arguments[1], callback); // takes as inputs a userID and a feederID
			break;
		case 'get user feeders':
			getFeedersSubscribedTo(arguments[0], callback); // takes as input a userID
			break;
		case 'create new user':
			createNewUser(arguments[0], arguments[1], callback); // takes as inputs a username and a password
			break;
		case 'add filter':
			createFilter(arguments[0], arguments[1], arguments[2], callback); // takes as inputs a userID, sourceID, filterID, and filter name
			break;
		case 'delete filter':
			deleteFilter(arguments[0], arguments[1], callback); // takes as inputs a userID and a filterID
			break;
		case 'get feeder sources':
			getFeederSources(arguments[0], callback); // takes as input a feederID
			break;
		default:
			throw new Error('invalid handler type!');
	}
}

function userExists(username, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [username];
			client.query('SELECT * FROM users WHERE username=$1', arguments, function(err, result){
				done();
				if(err){
					callback(err);
				}
				else{
					
					if (result.rowCount > 0){
						callback(undefined, true);
					}
					else{
						callback(undefined, false);
					}
				}
			});
		}
	});
	pg.end();
}

function createNewUser(username, password, callback){
	addUser(username, function (err, success){
		if(err){
			callback(err);
		}
		else{
			if(success){
				getUserID(username, function(error, id){
					if(err){
						callback(err);
					}
					else {
						setUserPassword(id, password, function (userError, message){
							if(userError){
								callback(userError);
							}
							else{
								var newUser = new User(username, id);
								callback(undefined, true, newUser);
								console.log(message);
							}
						});
					}
				});
			}
			else {
				callback(undefined, false);
			}
		}
	});
	pg.end();
}


function checkPassword(username, password, callback){
	userExists(username, function(err, existance){
		if(err){
			callback("Error connecting with database (user existance)");
		}
		else{

			if(existance){
				getUserID(username, function(err, userID){
					if(err){
						callback("Error connecting with database (getting user ID)");
					}
					else{
						getUserPassword(userID, function(err, dbPassword){
							if(err){
								callback("Error connecting with database (getting password for user)");
							}
							else{
								if(password === dbPassword){
									user = new User(username, userID);
									callback(undefined, true, user);
								}
								else{
									callback(undefined, false);
								}
							}

						});

					}
				});

			}
			else{
				callback("This user does not exist");
			}
		}
	});
	pg.end();
}



function addUser(username, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			userExists(username, function (err, userexists){
				if(err){
					callback(err);
				}
				else{
					if (userexists || username === undefined){
						callback(undefined, false);
					}
					else{
						var arguments = [username];
						client.query('INSERT INTO users VALUES ($1)', arguments, function(err, results){
							done();
							if(err){
								callback(err);
							}
							else{
								callback(undefined, true);
							}
						});
					}
				}
			});
		}
	});
	pg.end();
}

function getUserID(username, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [username];
			client.query('SELECT * FROM users WHERE username=$1', arguments, function (err, results){
				done();
				if(err){
					callback(err);
				}
				else{
					callback(undefined, results.rows[0].uid);
				}
			});
		}
	});
	pg.end();
}

function getSourceID(sourceName, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [sourceName];
			client.query('SELECT * FROM sources WHERE sourceLink=$1', arguments, function (err, results){
				done();
				if(err){
					callback(err);
				}
				else{

					callback(undefined, results.rows[0].sourceid);

				}
			});
		}
	});
	pg.end();
}

function sourceExists(sourceName, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [sourceName];
			client.query('SELECT * FROM sources WHERE sourceLink=$1', arguments, function (err, result){
				done();
				client.end();
				if(err){
					callback(err);
				}
				else{
					if (result.rowCount > 0){
						callback(undefined, true);
					}
					else{
						callback(undefined, false);
					}
				}
			});
		}
	});
	pg.end();
}

function addSource(sourceLink, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			sourceExists(sourceLink, function (err, sourceExists){
				if(err){
					callback(err);
				}
				else{
					if (sourceExists === true){
						callback(undefined, 'Source Already in Database!');
					}
					else{
						var arguments = [sourceLink];
						client.query("INSERT INTO sources (sourceLink, contentCategory, rank) VALUES ($1, 'DEFAULT', 1)", arguments, function (err, results){
							done();
							if(err){
								callback(err);
							}
							else{
								callback(undefined, 'Source Added!');
							}
						});
					}
				}
			});
		}
	});
	pg.end();
}

function getUserSources(userID, callback){
		pg.connect(connString, function (err, client, done){
				if(err){
					callback(err);
				}
				else{
					var arguments = [userID]
					client.query("SELECT S.sourcelink, S.sourceid FROM users U, usersSubscribedSources B, sources S WHERE U.uID = $1 AND U.uID = B.uID AND S.sourceID = B.sourceID", arguments, function (err, results){
					done();
					var arrayOfSources =[];
					for(var i =0; i<results.rows.length; i++){
						arrayOfSources.push(results.rows[i]);
					}
					callback(undefined, arrayOfSources);
					
					});
				}
			});
			pg.end();
}
						

function getUsersSubscribedSourceID(userID, callback){

	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID];
			client.query("SELECT * FROM usersSubscribedSources WHERE uID=$1", arguments, function (err, results){
				done();
				if(err){
					callback(err);
				}
				else{
					if(results.rowCount === 0){

						callback(undefined, 'User Not Subscribed To Any Sources!');
					}
					else{

						var sourceIDS = [];
						for(var i = 0; i < results.rows.length; i++){
							sourceIDS.push(results.rows[i].sourceid);
						}

						callback(undefined, sourceIDS);
					}
				}
			});
		}
	});
	pg.end();
}

function getFeederSources(feederID){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [feederID];
			client.query("SELECT * FROM usersSubscribedSources WHERE uID=$1 and broadcasting=TRUE", arguments, function (err, results){
				done();
				if(err){
					callback(err);
				}
				else{
					if(results.rowCount === 0){

						callback(undefined, 'User Not Subscribed To Any Sources!');
					}
					else{

						var sourceIDS = [];
						for(var i = 0; i < results.rows.length; i++){
							sourceIDS.push(results.rows[i].sourceid);
						}

						callback(undefined, sourceIDS);
					}
				}
			});
		}
	});
	pg.end();
}


function getSourceLink(sourceID, callback){
	pg.connect(connString, function (err, client, done){
		client.query("SELECT * FROM sources WHERE sourceID=$1", [sourceID], function (err, results){	
			if(err){
				callback(err);
			}
			else{	
				if(results.rowCount === 0){
					callback("There was a problem with finding your sources in the database");
				}
				else{
					callback(undefined, results.rows[0].sourcelink);
				}
			}
		});
	});
	pg.end();
}



function userHasPassword(userID, callback){
	pg.connect(connString, function (err, client, done){
		if (err){
			callback(err);
		}
		else{
			var arguments = [userID];
			client.query("SELECT * FROM passwords WHERE uID=$1", arguments, function (err, result){
				done();
				if(err){
					callback(err);
				}
				else{
					if(result.rowCount > 0){
						callback(undefined, true);
					}
					else{
						callback(undefined, false);
					}
				}
			});
		}
	});
	pg.end();
}

function setUserPassword(userID, encryptedPassword, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			userHasPassword(userID, function (err, user_has_password){
				if(err){
					callback(err);
				}
				else{
					if (user_has_password){
						var arguments = [userID, encryptedPassword];
						client.query("UPDATE passwords SET password = $2 WHERE uID = $1", arguments, function (err, results){
							done();
							if(err){
								callback(err);
							}
							else{
								callback(undefined, 'Password Successfully Changed!');
							}
						});
					}
					else{
						var arguments = [userID, encryptedPassword];
						client.query("INSERT INTO passwords (uID, password) VALUES ($1, $2)", arguments, function (err, results){
							if(err){
								callback(err);
							}
							else{
								callback(undefined, true);
							}
						});
					}
				}
			});
		}
	});
	pg.end();
}

function getUserPassword(userID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID];
			client.query("SELECT * FROM passwords WHERE uID=$1", arguments, function (err, results){
				if(err){
					callback(err);
				}
				else{
					callback(undefined, results.rows[0].password);
				}
			});
		}
	});
	pg.end();
}

function userAlreadySubscribedSource(userID, sourceID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID, sourceID];
			client.query("SELECT * FROM usersSubscribedSources WHERE uID=$1 and sourceID=$2", arguments, function (err, results){
				if(err){
					callback(err);
				}
				else{
					if(results.rowCount > 0){
						callback(undefined, true);
					}
					else{
						callback(undefined, false);
					}
				}
			});
		}
	});
	pg.end();
}

function subscribeUserToSource(userID, sourceID, callback){
	pg.connect(connString, function(err, client, done){
		if(err){
			callback(err);
		}
		else{
			userAlreadySubscribedSource(userID, sourceID, function (err, already_subscribed){
				if (err){
					callback(err);
				}
				else{
					if(already_subscribed){
						callback(undefined, 'User Already Subscribed');
					}
					else{
						var arguments = [userID, sourceID];
						client.query("INSERT INTO usersSubscribedSources (uID, sourceID) VALUES ($1, $2)", arguments, function (err, results){
							if(err){
								callback(err);
							}
							else{
								callback(undefined, 'User Subscribed To Source Successfully!');
							}
						});
					}
				}
			});
		}
	});
	pg.end();
}

function unsubscribeUserFromSource(userID, sourceID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			userAlreadySubscribedSource(userID, sourceID, function (err, already_subscribed){
				if(err){
					callback(err);
				}
				else{
					if(already_subscribed){
						var arguments = [userID, sourceID];
						client.query("DELETE FROM usersSubscribedSources WHERE uID=$1 and sourceID=$2", arguments, function (err, results){
							if(err){
								callback(err);
							}
							else{
								callback(undefined, 'User Unsubscribed From Source Successfully!');
							}
						});
					}
					else{
						callback(undefined, 'User Is Not Subscribed To That Source!');
					}
				}
			});
		}
	});
	pg.end();
}

function userAlreadySubscribedFeeder(userID, feederID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID, feederID];
			client.query("SELECT * FROM usersSubscribedFeeder WHERE uID=$1 and feederID=$2", arguments, function (err, results){
				if(err){
					callback(err);
				}
				else{
					if(results.rowCount > 0){
						callback(undefined, true);
					}
					else{
						callback(undefined, false);
					}
				}
			});
		}
	});
	pg.end();
}

function subscribeUserToFeeder(userID, feederID, callback){
	if (userID === feederID){
		callback(undefined, 'User Can\'t Subscribe To Them Self!');
	}
	else{
		pg.connect(connString, function(err, client, done){
			if(err){
				callback(err);
			}
			else{
				userAlreadySubscribedFeeder(userID, feederID, function (err, already_subscribed){
					if (err){
						callback(err);
					}
					else{
						if(already_subscribed){
							callback(undefined, false);
						}
						else{
							var arguments = [userID, feederID];
							client.query("INSERT INTO usersSubscribedFeeder (uID, feederID) VALUES ($1, $2)", arguments, function (err, results){
								if(err){
									callback(err);
								}
								else{
									callback(undefined, true);
								}
							});
						}
					}
				});
			}
		});
		pg.end();
	}
}

function unsubscribeUserFromFeeder(userID, feederID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			userAlreadySubscribedFeeder(userID, feederID, function (err, already_subscribed){
				if(err){
					callback(err);
				}
				else{
					if(already_subscribed){
						var arguments = [userID, feederID];
						client.query("DELETE FROM usersSubscribedFeeder WHERE uID=$1 and feederID=$2", arguments, function (err, results){
							if(err){
								callback(err);
							}
							else{
								callback(undefined, 'User Unsubscribed From Feeder Successfully!');
							}
						});
					}
					else{
						callback(undefined, 'User Is Not Subscribed To That Feeder!');
					}
				}
			});
		}
	});
	pg.end();
}

function getFeedersSubscribedTo(userID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID];
			client.query("SELECT * FROM usersSubscribedFeeder S, users F WHERE S.uid= $1 AND S.feederid = F.uid", arguments, function (err, results){
				if(err){
					callback(err);
				}
				else{
					if(results.rowCount === 0){
						callback(undefined, 'User Not Subscribed To Any Feeders!');
					}
					else{
						callback(undefined, results);
					}
				}
			});
		}
	});
	pg.end();
}

function getFeeders(userID, callback){
	var tempFeeder;
	var feeders = [];
	getFeedersSubscribedTo(userID, function (err, results){
		if(err){
			callback(err);
		}
		else{
		if(results.rows !== undefined){
			for(var i =0; i<results.rows.length; i++){
				var user = new User(results.rows[i].username, results.rows[i].uid);
				tempFeeder = new Feeder(user, undefined);
				feeders.push(tempFeeder);
				if(i === results.rows.length-1){
					callback(undefined, feeders);
				}
			}
		}
		else{
			console.log("PRDJFSDF");
			callback(undefined, []);
		}
	}
	});
}

function feeders(userID, callback){
	var returnFeeders = [];
	getFeeders(userID, function (err, results){
		if(err){
			callback(err);
		}
		else{
			if(results.length > 0){
			for(var i=0; i<results.length; i++){
				tempFeeder = results[i];
				getSources(results[i], function (sourceError, tempFeeder){
					if(sourceError){
						callback(sourceError);
					}
					else{
						returnFeeders.push(tempFeeder);
						if(returnFeeders.length === results.length){
							callback(undefined, returnFeeders);
						}
					}
				});
			}
		}
			else{
				callback(undefined, []);
			}
		}
	});
}

function getSources(feeder, callback){
	getUsersSubscribedSourceID(feeder.User.uid, function (error, sourceIDS){
		
		if(error){

			console.log(error);
		}
		else{
			pg.connect(connString, function (err, client, done){
				if(err){
					console.log(err);
				}
				else{
					var arguments = [feeder.User.uid]
					client.query("SELECT S.sourcelink FROM users U, usersSubscribedSources B, sources S WHERE U.uID = $1 AND U.uID = B.uID AND S.sourceID = B.sourceID", arguments, function (err, results){
					done();
					var arrayOfSources =[];
					for(var i =0; i<results.rows.length; i++){

						arrayOfSources.push(results.rows[i].sourcelink);
					}
					feeder.arrayOfSources = arrayOfSources;
					callback(undefined, feeder);
					
					});
				}
			});
			pg.end();
		}
	});
}

function createFilter(userID, sourceIDArray, filterName, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
		
			if(typeof(sourceIDArray) === 'string'){
				sourceIDArray = [sourceIDArray];
			}

			if(sourceIDArray.length > 1){
			sourceIDArray.forEach(function (entry){
				var arguments = [userID, entry, filterName];
				client.query("INSERT INTO filters (uID, sourceID, filterName) VALUES ($1, $2, $3)", arguments, function (err, results){
					if(err){
						callback(err);
					}
					else{
						callback(undefined);
					}
				});
			});
		}
		if(sourceIDArray.length === 1){
			client.query("INSERT INTO filters (uID, sourceID, filterName) VALUES ($1, $2, $3)", [userID, sourceIDArray[0], filterName], function (err, results){
					if(err){
						callback(err);
					}
					else{
						callback(undefined);
					}
				});
		}
		}
	});
	pg.end();
}

function deleteFilter(userID, filterID){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID, filterID];
			client.query("DELETE FROM filters WHERE uID=$1 and fID=$2", arguments, function (err, results){
				if(err){
					callback(err);
				}
				else{
					callback(undefined, 'Filter Delted');
				}
			});
		}
	});
	pg.end();
}

function filters(userID, callback){
	var filters = [];
	getFilterNames(userID, function (filterNameError, arrayOfFilterNames){
		if(filterNameError){
			callback(filterNameError);
		}
		else{
			if((arrayOfFilterNames === undefined) || (arrayOfFilterNames.length <= 0) ){
				callback(undefined, undefined);
			}
			for(var i=0; i<arrayOfFilterNames.length; i++){

				getFilterSources(userID, arrayOfFilterNames[i].filtername, arrayOfFilterNames.length, i, function (filterSourcesError, filtername, length, i, arrayOfFilterSources){
					if(filterSourcesError){
						callback(filterSourcesError);
					}
					else{
						var tempFilter = new Filter(filtername, arrayOfFilterSources, undefined);

						filters.push(tempFilter);
							if(i === length-1){
								callback(undefined, filters);
							}
					}
				});

			}

		}
	});
}



function getFilterNames(userID, callback){
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments=[userID];
			client.query("SELECT DISTINCT F.filterName FROM users U, filters F, sources S WHERE U.uID =$1 AND U.uID = F.uID AND S.sourceid = F.sourceid", [userID], function (err, results){
				if(err){
					callback(err);
				}
				else{

				callback(undefined, results.rows);
			}
			});
		}
	});
	pg.end();
}

function getFilterSources(userID, filterName, length, i, callback){
	var tempArray = [];
	pg.connect(connString, function (err, client, done){
		if(err){
			callback(err);
		}
		else{
			var arguments = [userID, filterName];
			client.query("SELECT DISTINCT S.sourcelink FROM users U, filters F, sources S WHERE U.uID = $1 AND F.filterName = $2 AND U.uID = F.uID and S.sourceid = F.sourceid", arguments, function (err, results){
				if(err){
					callback(err);
				}
				else{
					results.rows.forEach( function (entry){
						tempArray.push(entry.sourcelink);
					});
					callback(undefined, filterName, length, i, tempArray);
				}
			});
		}
		});
	
}



exports.processQuery = processQuery;
exports.checkPassword = checkPassword;

exports.userExists = userExists;

exports.createNewUser = createNewUser;

exports.getSourceID = getSourceID;

exports.getUserID = getUserID;

exports.subscribeUserToSource = subscribeUserToSource;

exports.filters = filters;

exports.feeders = feeders;