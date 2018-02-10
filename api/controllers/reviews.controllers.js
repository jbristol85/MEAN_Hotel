var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

//  GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
	//copied from hotels GetOne controller but used . notation to get reviews(.json(doc.reviews)
	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews') //will only pull the reviews data from the json rather then full hotel data
		.exec(function(err, doc) {
			console.log(doc);
			var response = {
				status: 200,
				message: []
			};
			if (err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}
			else if (!doc) {
				console.log("HotelId not in database");
				response.status = 404,
					response.message = {
						"message": "Hotel ID not found " + hotelId
					};
			}
			else {
				response.message = doc.reviews;
			}
			res
				.status(response.status)
				.json(response.message);
		});


};

// GET one review for a hotel
module.exports.reviewsGetOne = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews') //will only pull the reviews data from the json rather then full hotel data
		.exec(function(err, hotel) {
			console.log("Returned hotel", hotel);
			var review = hotel.reviews.id(reviewId);
			var response = {
				status: 200,
				message: {}
			};
			if (err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}
			else if (!hotel) {
				console.log("HotelId not in database");
				response.status = 404,
					response.message = {
						"message": "Hotel ID not found " + hotelId
					};
			}
			else {
				response.message = review;

				if (!response.message) {
					response.status = 404;
					response.message = {
						"message": "Review ID not found " + reviewId
					};
				}
			}
			res
				.status(response.status)
				.json(response.message);
		});

};

var _addReview = function(req, res, hotel) {

	hotel.reviews.push({
		name: req.body.name,
		rating: parseInt(req.body.rating, 10),
		review: req.body.review
	});
	hotel.save(function(err, hotelUpdated) {
		if (err) {
			res
				.status(500)
				.json(err);
		}
		else {
			res
				.status(201)
				.json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
		}
	});
};

module.exports.reviewsAddOne = function(req, res) {
	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews') //will only pull the reviews data from the json rather then full hotel data
		.exec(function(err, doc) {
			console.log(doc);
			var response = {
				status: 200,
				message: []
			};
			if (err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}
			else if (!doc) {
				console.log("HotelId not in database");
				response.status = 404,
					response.message = {
						"message": "Hotel ID not found " + hotelId
					};
			}
			if (doc) {
				_addReview(req, res, doc);
			}
			else {
				res
					.status(response.status)
					.json(response.message);
			}
		});
};

module.exports.reviewsUpdateOne = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews') //will only pull the reviews data from the json rather then full hotel data
		.exec(function(err, hotel) {
			console.log("Returned hotel", hotel);
			var review = hotel.reviews.id(reviewId);
			var response = {
				status: 200,
				message: {}
			};
			if (err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}
			else if (!hotel) {
				console.log("HotelId not in database");
				response.status = 404,
					response.message = {
						"message": "Hotel ID not found " + hotelId
					};
			}
			else {
				// response.message = review;

				if (!response.message) {
					response.status = 404;
					response.message = {
						"message": "Review ID not found " + reviewId
					};
				}
			}
			if (response.status !== 200) {
				res
					.status(response.status)
					.json(response.message);
			}
			else {
				review.name = req.body.name;
				review.rating = parseInt(req.body.rating, 10);
				review.review = req.body.review;

				hotel.save(function(err, updatedReview) {
					if (err) {
						res
							.status(500)
							.json(err);
					}
					else {
						res
							.status(204)
							.json();
					}
				});
			}
		});

};

module.exports.reviewsDeleteOne = function(req, res){
		var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews') //will only pull the reviews data from the json rather then full hotel data
		.exec(function(err, hotel) {
			console.log("Returned hotel", hotel);
			
			var response = {
				status: 200,
				message: {}
			};
			if (err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			}
			else if (!hotel) {
				console.log("HotelId not in database");
				response.status = 404,
					response.message = {
						"message": "Hotel ID not found " + hotelId
					};
			}
			else {
				// response.message = review;

				if (!response.message) {
					response.status = 404;
					response.message = {
						"message": "Review ID not found " + reviewId
					};
				}
			}
			if (response.status !== 200) {
				res
					.status(response.status)
					.json(response.message);
			}else {
				hotel.reviews.id(reviewId).remove();
				hotel.save(function(err, updatedReview) {
					if (err) {
						res
							.status(500)
							.json(err);
					}
					else {
						res
							.status(204)
							.json();
					}
				});
			}
		});
};