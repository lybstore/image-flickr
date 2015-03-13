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

	var promise = tickrService.getjobs();
	promise.then(function (data){

		$scope.jobs = data.jobs;
		//console.log($scope.jobs);
		$scope.startAuto();
	});


// JOBS FLICKR FUNCTIONS 

$scope.jobNotification = 0;

  $scope.startAuto = function() {
  	var timer = $interval(function() {
  	
        if ($scope.jobNotification < $scope.jobs.length -1) {
          $scope.jobNotification += 1;
        } else {
          $scope.jobNotification = 0;
          
        }
  
  	}, 3000);
  };
  
	$scope.isActive = function (index) {
		return $scope.jobNotification === index;
	};

	$scope.showJobNotification = function (index) {
		$scope.jobNotification = index;
	};

});	
