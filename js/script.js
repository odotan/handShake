var handShakeApp = angular.module('handShakeApp', ['ngRoute']);

handShakeApp.controller('mainController', ['$scope', function($scope) {
	$scope.privateKey = '';
    $scope.publicKey = '';

    $scope.scanQR = function (inputId) {
		load($('#' + inputId));
    };
}]);

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

$(document).ready(function() {
	var qrcode_write = new QRCode("qrcode_write");

	// $("#txt2read").on("keydown", function(e){
	//     var elText = document.getElementById("txt2read");
	//     qrcode_write.makeCode(elText.value);
	// });
});