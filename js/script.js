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
		}
	};

    $rootScope.insertPublicColdStorageKey = function() {
        var publicColdStorageKey = $('#input_page_4').val();
    };
});

handShakeApp.controller('mainController', function($scope, $rootScope) {
	
});
handShakeApp.controller('pageWithScanController', function($scope, $rootScope) {
	$scope.scanQR = function (inputId) {
		$("#qrs #cam").css("display","inline-block");
		load($('#' + inputId));
	};
	
});
handShakeApp.controller('page3Controller', function($scope, $rootScope) {
	qrcode_write = new QRCode("qrcode_write");
	qrcode_write.makeCode($rootScope.root.publicKey);
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
			controller: 'pageWithScanController'
		})
		.when('/page3', {
			templateUrl: 'page3',
			controller: 'page3Controller'
		})
		.when('/page4', {
			templateUrl: 'page4',
			controller: 'pageWithScanController'
		})
		.when('/page5', {
			templateUrl: 'page5',
			controller: 'pageWithScanController'
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

});