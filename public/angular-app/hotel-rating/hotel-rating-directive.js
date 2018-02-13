/* global angular */ 

angular.module('meanhotel').component('hotelRating',{
	bindings:{
		stars: '='
	},
	template: '<span ng-repeat="star in vm.stars track by $index" class="fa fa-star">{{ star }}</span>',
	controller: "HotelController",
	controllerAs: 'vm',
});

// angular.module('meanhotel').directive('hotelRating', hotelRating);

// function hotelRating(){
// 	return {
// 		restrict: 'E', //element
// 		template: '<span ng-repeat="star in vm.stars track by $index" class="fa fa-star">{{ star }}</span>',
// 		bingToController: true,
// 		controller: "HotelController",
// 		controllerAs: 'vm',
// 		scope:{
// 			stars: '@'
// 		}
// 	};
// }