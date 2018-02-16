// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');
var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

var runGeoQuery = function(req, res){
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	
	var point = {
		type:"Point",
		coordinates: [lng, lat]
	};
	var geoOptions = {
		spherical : true,
		maxDistance : 2000,
		num : 5
	};
	
	Hotel
		.aggregate([
			{
				$geoNear: {
					near: point,
					distanceField : "distance",
					maxDistance : 2000,
					spherical: true,
					num : 5
				}
			}], 
				function(err, results, stats){
					console.log("Geo results",  results);
					// console.log("Geo stats", stats);
					res
						.status(200)
						.json(results);
				}
			);
};

module.exports.hotelsGetAll = function(req, res){
	// var db = dbconn.get();
	// var collection = db.collection('hotels');
	console.log("Requested by: " + req.user);
	console.log('GET the hotels');
	console.log(req.query);
	
	var offset = 0;
	var count = 5;
	var maxCount = 10;
	
	if(req.query && req.query.lat && req.query.lng){
		runGeoQuery(req, res);
		return;
	}
	
	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);  //query parameters come back as a string
	}
	
	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);  //query parameters come back as a string
	}
	
	if(isNaN(offset) || isNaN(count)){
		res
			.status(400)
			.json({
				"message": "Offset and Count should be numbers"
			});
		return;
	}
	 if(count > maxCount){
	 	res
	 		.status(400)
	 		.json({
	 			"message": "Count limit has exceeded the limit of " + maxCount
	 		});
	 	return;
	 }
	
	Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err, hotels){
			if(err){
				console.log("Error finding hotels");
				res
				.status(500)
				.json(err);
			}else{
			console.log("Found hotels", hotels.length);
			res
				.json(hotels);
			}
		});
	
	// collection
	// 	.find()
	// 	.skip(offset)
	// 	.limit(count)
	// 	.toArray(function(err, docs){
	// 		console.log("Found Hotels", docs);
	// 		res
	// 			.status(200)
	// 			.json(docs);	
	// 	});

};

module.exports.hotelsGetOne = function(req, res){
	// var db = dbconn.get();
	// var collection = db.collection('hotels');
	
	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);
	
	Hotel
		.findById(hotelId)
		.exec(function(err, doc){
			var response = {
				status: 200,
				message: doc
			};
			if(err){
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}else if(!doc){
				response.status = 404,
				response.message ={
					"message": "Hotel ID not found"
				};
			}
			res
				.status(response.status)
				.json(response.message);	
			});
		};
		
		var _splitArray = function(input){
			var output;
			if (input && input.length > 0){
				output = input.split(";");
			}else {
				output = [];
			}
			return output;
		};
	
module.exports.hotelsAddOne = function(req, res){
	
	Hotel
		.create({
			name : req.body.name,
			description: req.body.description,
			stars: parseInt(req.body.stars, 10),
			services: _splitArray(req.body.services),
			photos: _splitArray(req.body.photos),
			currency: req.body.currency,
			location:{
				address:req.body.address,
				coordinates:[
					parseFloat(req.body.lng),
					parseFloat(req.body.lat)
				]
			}
		}, function(err, hotel){
			if (err){
				console.log("Error creating hotel");
				res
					.status(400)
					.json(err);
			}else{
				console.log("Hotel Created", hotel);
				res
					.status(201)
					.json(hotel);
			}
		});
	
	//  Native driver code
	// var db = dbconn.get();
	// var collection = db.collection('hotels');
	// var newHotel;
	
	// console.log("Post new hotel");	
	
	// if(req.body && req.body.name && req.body.stars){
	// 	newHotel = req.body;
	// 	newHotel.stars = parseInt(req.body.stars, 10);
	// 	console.log(newHotel);
	// 	collection.insertOne(newHotel,function(err, response){
	// 		console.log(response);
	// 		console.log(response.ops);
	// 		res
	// 			.status(201)
	// 			.json(response.ops);
		
	// 	});
	
	// } else {
	// 	console.log("Data missing from the body");
	// 	res
	// 		.status(400)
	// 		.json({message:"Required data missing from body"});
	// }
};

module.exports.hotelsUpdateOne = function(req, res){
	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);
	
	Hotel
		.findById(hotelId)
		.select("-reviews -rooms") // excludes these subdocuments
		.exec(function(err, doc){
			var response = {
				status: 200,
				message: doc
			};
			if(err){
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}else if(!doc){
				response.status = 404,
				response.message ={
					"message": "Hotel ID not found"
				};
			}
			if(response.status !== 200){
				res
					.status(response.status)
					.json(response.message);	
			}else{
				doc.name = req.body.name;
				doc.description = req.body.description;
				doc.stars = parseInt(req.body.stars, 10);
				doc.services = _splitArray(req.body.services);
				doc.photos = _splitArray(req.body.photos);
				doc.currency = req.body.currency;
				doc.location = {
					address:req.body.address,
					coordinates:[
						parseFloat(req.body.lng),
						parseFloat(req.body.lat)
					]
				};
				
				doc.save(function(err, updateHotel){
					if(err){
						res
							.status(500)
							.json(err);
					}else{
						res
							.status(204)
							.json();
					}
				});
			}
			
			});
		
};

module.exports.hotelsDeleteOne = function(req, res){
	var hotelId = req.params.hotelId;
	
	Hotel
		.findByIdAndRemove(hotelId)
		.exec(function(err, hotel){
			if(err){
				res
					.status(404)
					.json(err);
			}else{
				console.log("Hotel deleted, id: " + hotelId);
				res
					.status(204)
					.json();
			}
		});
};