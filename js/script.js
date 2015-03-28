var qrcode_write;

var handShakeApp = angular.module('handShakeApp', ['ngRoute']);

handShakeApp.run(function($rootScope){
	$rootScope.root = $rootScope; 
	$rootScope.privateKey = '';
	$rootScope.publicKey = '';
    $rootScope.publicColdStorageKey = '';

	$rootScope.createPublicKey = function() {
        var privateKey = $('#input_page_2').val();
		if (privateKey) {
            $rootScope.root.privateKey = privateKey;
			$rootScope.root.publicKey = (new Bitcoin.ECKey($rootScope.root.privateKey)).getBitcoinAddress().toString();
			qrcode_write.makeCode($rootScope.root.publicKey);
		}
	};

    $rootScope.insertPublicColdStorageKey = function() {
        var publicColdStorageKey = $('#input_page_4').val();
    };
});

handShakeApp.controller('mainController', function($scope, $rootScope) {
	$scope.scanQR = function (inputId) {
		load($('#' + inputId));
	};
});

handShakeApp.config(function($routeProvider) {   
	$routeProvider
		.when('/', {
			templateUrl: 'page1',
			controller: 'mainController'
		})
		.when('/page1', {
			templateUrl: 'page1',
			controller: 'mainController'
		})
		.when('/page2', {
			templateUrl: 'page2',
			controller: 'mainController'
		})
		.when('/page3', {
			templateUrl: 'page3',
			controller: 'mainController'
		})
		.when('/page4', {
			templateUrl: 'page4',
			controller: 'mainController'
		})
		.when('/page5', {
			templateUrl: 'page5',
			controller: 'mainController'
		})
		.when('/page6', {
			templateUrl: 'page6',
			controller: 'mainController'
		})
		.when('/page7', {
			templateUrl: 'page7',
			controller: 'mainController'
		})
		.when('/page8', {
			templateUrl: 'page8',
			controller: 'mainController'
		})
		.when('/page9', {
			templateUrl: 'page9',
			controller: 'mainController'
		});
});

$(document).ready(function() {
	qrcode_write = new QRCode("qrcode_write");

	// $("#txt2read").on("keydown", function(e){
	//	 var elText = document.getElementById("txt2read");
	//	 qrcode_write.makeCode(elText.value);
	// });
});