var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll) // mapped a controller to the route
	.post(ctrlHotels.hotelsAddOne); // can chain methods 

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne)
	.put(ctrlHotels.hotelsUpdateOne)
	.delete(ctrlHotels.hotelsDeleteOne);
	
// router
// 	.route('/hotels/new')
// 	.post(ctrlHotels.hotelsAddOne);


// Review Routes
router
	.route('/hotels/:hotelId/reviews')
	.get(ctrlReviews.reviewsGetAll)  // mapped a controller to the route
	.post(ctrlReviews.reviewsAddOne);
	
router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne)
	.put(ctrlReviews.reviewsUpdateOne)
	.delete(ctrlReviews.reviewsDeleteOne);
	
	
	module.exports = router;