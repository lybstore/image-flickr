"use strict"; 

var app = angular.module("tickrApp", []);

app.service("tickrService", function ($http, $q){
	var deferred = $q.defer();
	$http.get('app/data/jobs.json').then(function (response){
		deferred.resolve(response.data);
	});

	this.getjobs = function () {
		return deferred.promise;
	}
})

.controller('tickCtrl', function($scope, $interval, tickrService) {

	$scope.date = new Date();

	var promise = tickrService.getjobs();
	promise.then(function (data){

		$scope.jobs = data.jobs;
		$scope.startAuto();

	});

	// JOBS FLICKR FUNCTIONS 

    $scope.jobNotification = 0;

    var timer;
	$scope.startAuto = function() {
	  	timer = $interval(function(){
	  		$scope.jobNotification = ($scope.jobNotification + 1) % $scope.jobs.length;
	  	}, 5000);
	};
	  
	$scope.isActive = function (index) {
		return $scope.jobNotification === index;
		
	 };

	$scope.showJobNotification = function (index) {
		if (timer){
			$interval.cancel(timer);
			$scope.startAuto();
		}
		$scope.jobNotification = index;
	};


});	
