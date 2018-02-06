var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://'+process.env.IP+':27017/MEAN_Hotel';

var _connection = null;

var open = function(){
	MongoClient.connect(dburl, function(err, client){
		if(err){
			console.log("DB connection Failed");
			return;
		}
		_connection = client.db("meanHotel");
		console.log("DB connection open", client)
	});
};
var get = function(){
	return _connection;
};
module.exports = {
	open : open,
	get : get
};