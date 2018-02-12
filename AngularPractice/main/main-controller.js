/* global angular */

angular.module('myApp').controller('MyController', MyController);

function MyController (FilmFactory){
	var vm =  this;
	
	FilmFactory.getAllFilms().then(function(response){
		vm.films = response;
	});
	
	vm.name = "Josh";
	
	vm.date1 = '12 February 2017';
}