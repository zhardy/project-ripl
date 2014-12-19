var db = require('./dbAccess.js');

var users = ['Josh', 'Zack', 'Tengo', 'Luke', 'Ben'];
var passwords = ['password'];

var source_links = ['http://www.reddit.com/.rss',
'http://www.reddit.com/r/news/.rss',
'http://www.reddit.com/r/AdviceAnimals/.rss',
'http://xkcd.com/rss.xml',
'http://feeds2.feedburner.com/PatrickRothfuss',
'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
'http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
'http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
'http://feeds.feedburner.com/smbc-comics/PvLb?format=xml',
'http://www.npr.org/rss/rss.php?id=1001',
'http://feeds.wired.com/wired/index',
'http://feeds.feedburner.com/InterestingThingOfTheDay',
'http://feeds.feedburner.com/techcrunch',
'http://lifehacker.com/rss',
'http://feeds.reuters.com/reuters/topNews'];

function create_users(){
	for(var i = 0; i < users.length; i++){
		db.processQuery('create new user', [users[i], passwords[0]], function (err, response){
			if (err){
				console.log(err);
			}
			else{
				console.log(response);
				console.log(i);
			}
		});
	};
}

function add_source(){
	for(var j = 0; j < source_links.length; j++){
		// console.log(source_links[j]);
		db.processQuery('add source', [source_links[j]], function (err, response){
			if (err){
				console.log(err);
			}
			else{
				console.log(response);
			}
		});
	};
}


create_users();
add_source();
