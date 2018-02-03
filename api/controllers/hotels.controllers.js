var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res){
	console.log("GET the hotels");
	console.log(req.query);
	
	var offset = 0;
	var count = 5;
	
	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);  //query parameters come back as a string
	}
	
	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);  //query parameters come back as a string
	}
	
	var returnData = hotelData.slice(offset, offset+count);

	res
		.status(200)
		.json(returnData);	
};

module.exports.hotelsGetOne = function(req, res){
	var hotelId = req.params.hotelId;
	var thisHotel = hotelData[hotelId];
	console.log("GET hotelId", hotelId);
		res
			.status(200)
			.json(thisHotel);	
};

module.exports.hotelsAddOne = function(req, res){
	console.log("Post new hotel");	
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};