var handShakeApp = angular.module('handShakeApp', ['ngRoute']);

handShakeApp.config(function($routeProvider) {   
	$routeProvider
		.when('/', {
			templateUrl: 'page1'
		})
		.when('/page1', {
            templateUrl: 'page1'
        })
        .when('/page2', {
			templateUrl: 'page2'
		})
		.when('/page3', {
			templateUrl: 'page3'
		})
		.when('/page4', {
			templateUrl: 'page4'
		})
		.when('/page5', {
			templateUrl: 'page5'
		})
		.when('/page6', {
			templateUrl: 'page6'
		})
		.when('/page7', {
			templateUrl: 'page7'
		})
		.when('/page8', {
			templateUrl: 'page8'
		})
		.when('/page9', {
			templateUrl: 'page9'
		});
});