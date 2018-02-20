var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll) // ctrlUsers.authenticate,// mapped a controller to the route
	.post(ctrlHotels.hotelsAddOne); // can chain methods 

router
	.route('/hotel/:hotelId')
	.get(ctrlHotels.hotelsGetOne)
	.put(ctrlHotels.hotelsUpdateOne)
	.delete(ctrlHotels.hotelsDeleteOne);
	
// router
// 	.route('/hotels/new')
// 	.post(ctrlHotels.hotelsAddOne);


// Review Routes
router
	.route('/hotel/:hotelId/reviews')
	.get(ctrlReviews.reviewsGetAll)  // mapped a controller to the route
	.post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);
	
router
	.route('/hotel/:hotelId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne)
	.put(ctrlReviews.reviewsUpdateOne)
	.delete(ctrlReviews.reviewsDeleteOne);
	
	//Authentication 
router
	.route('/users/register')
	.post(ctrlUsers.register);
	
router
	.route('/users/login')
	.post(ctrlUsers.login);
	
	
	module.exports = router;