var qrcode_write;
var helloblock = new HelloBlock();

var handShakeApp = angular.module('handShakeApp', ['ngRoute']);

handShakeApp.run(function($rootScope, $http){
	$rootScope.root = $rootScope; 
	$rootScope.privateKey = '';
	$rootScope.publicKey = '';
    $rootScope.publicColdStorageKey = '';
    $rootScope.amount = '';
    $rootScope.unsignedTransactionData = '';
    $rootScope.signedTransactionData = '';

	$rootScope.createPublicKey = function() {
        var privateKey = $('#input_page_2').val();
		if (privateKey) {
            $rootScope.root.privateKey = privateKey;
			$rootScope.root.publicKey = (new bitcoin.ECKey($rootScope.root.privateKey)).getAddress().toString();
		}
	};

    $rootScope.insertPublicColdStorageKey = function() {
        $rootScope.publicColdStorageKey = $('#input_page_4').val();
    };

    $rootScope.insertTargetAddressAndAmount = function() {
        $rootScope.publicKey = $('#input_page_5_1').val();
        $rootScope.amount = $('#input_page_5_2').val();
    };

    $rootScope.insertUnsignedTransactionData = function() {
        $rootScope.unsignedTransactionData = $('#input_page_7').val();
    };

    $rootScope.insertSignedTransactionData = function() {
        $rootScope.signedTransactionData = $('#input_page_9').val();
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
handShakeApp.controller('page6Controller', function($scope, $rootScope, $http) {
		var txFee = 10000;
        var txTargetValue = parseFloat($rootScope.amount) * 100000000;

        helloblock.addresses.getUnspents($rootScope.publicColdStorageKey, {
			value: txTargetValue + txFee
		}, function(err, res, unspents) {
                var txData = {
                    inputs: [],
                    outputs: []
                };

                var totalUnspentsValue = 0;
                unspents.forEach(function(unspent) {
                    txData.inputs.push({
                        tx_hash: unspent.txHash,
                        tx_index: unspent.index
                    })
                    totalUnspentsValue += unspent.value;
                });

                txData.outputs.push({
                    hash: $rootScope.publicKey,
                    value: txTargetValue
                });

                var txChangeValue = totalUnspentsValue - txTargetValue - txFee;
                txData.outputs.push({
                    hash: $rootScope.publicColdStorageKey,
                    value: txChangeValue
                });

                qrcode_write = new QRCode("qrcode_write");
                qrcode_write.makeCode(JSON.stringify(txData));
            });
});
handShakeApp.controller('page8Controller', function($scope, $rootScope, $http) {
	var data = JSON.parse($rootScope.unsignedTransactionData),
		ecKey = new bitcoin.ECKey($rootScope.root.privateKey);

	var tx = new bitcoin.Transaction();
    for (var i = 0 ; i < data.inputs.length ; i++) {
        tx.addInput(data.inputs[i].tx_hash, data.inputs[i].tx_index);
    }
    for (var i = 0 ; i < data.outputs.length ; i++) {
        tx.addOutput(data.outputs[i].hash, data.outputs[i].value);
    }

    tx.ins.forEach(function(input, index) {
    	tx.sign(index, ecKey);
	});

	qrcode_write = new QRCode("qrcode_write");
	qrcode_write.makeCode(tx.serializeHex());
});

handShakeApp.controller('page10Controller', function($scope, $rootScope, $http) {
	helloblock.transactions.propagate($rootScope.signedTransactionData, function(err, res, tx) {
	});
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
			controller: 'page6Controller'
		})
		.when('/page7', {
			templateUrl: 'page7',
			controller: 'pageWithScanController'
		})
		.when('/page8', {
			templateUrl: 'page8',
			controller: 'page8Controller'
		})
		.when('/page9', {
			templateUrl: 'page9',
			controller: 'pageWithScanController'
		})
		.when('/page10', {
			templateUrl: 'page10',
			controller: 'page10Controller'
		});
});

$(document).ready(function() {

});