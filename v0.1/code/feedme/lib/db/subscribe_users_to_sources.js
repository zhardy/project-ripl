var db = require('./dbAccess.js');

function subscribe_users_to_source(){
	for(var k = 1; k < 6; k++){
		db.processQuery('subscribe to source', [k, Math.floor(Math.random() * 15) + 1], function (err, response){
			if (err){
				console.log(err);				
			}
			else{
				console.log(response);
			}
		});
	}
	for(var k = 1; k < 6; k++){
		db.processQuery('subscribe to source', [k, Math.floor(Math.random() * 15) + 1], function (err, response){
			if (err){
				console.log(err);				
			}
			else{
				console.log(response);
			}
		});
	}
	for(var k = 1; k < 6; k++){
		db.processQuery('subscribe to source', [k, Math.floor(Math.random() * 15) + 1], function (err, response){
			if (err){
				console.log(err);				
			}
			else{
				console.log(response);
			}
		});
	}
	for(var k = 1; k < 6; k++){
		db.processQuery('subscribe to source', [k, Math.floor(Math.random() * 15) + 1], function (err, response){
			if (err){
				console.log(err);				
			}
			else{
				console.log(response);
			}
		});
	}	
}

subscribe_users_to_source();