var db = require('./dbAccess.js')

function subscribe_to_feeders(){
	for(var k = 1; k < 6; k++){
		var feederID = Math.floor(Math.random() * 6) + 1
		db.processQuery('subscribe to feeder', [k, feederID], function (err, response){
			if (err){
				console.log(err);				
			}
			else{
				console.log(response);
			}
		});
	}
}

subscribe_to_feeders();
subscribe_to_feeders();
subscribe_to_feeders();