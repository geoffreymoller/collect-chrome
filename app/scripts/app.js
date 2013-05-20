'use strict';

var app = angular.module('collect', []);

app.service('chromeService', function() {
  return chrome;
});

app.controller('CollectController', function($scope, $rootScope, $http, $location, $routeParams, $q, chromeService) {

  $scope.query = function(){
    chromeService.tabs.query({}, angular.bind(this, function(tab) {
      $scope.$apply(function(){
        $scope.tab = tab;
      });
    }));
  }

}).$inject = ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$q', 'chromeService'];


