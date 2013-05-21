'use strict';

var app = angular.module('collect', ['ngResource']);

app.service('chromeService', function() {
  return chrome;
});

app.controller('CollectController', function($scope, $rootScope, $http, $location, $routeParams, $q, chromeService, $resource) {

  var BaseURI = 'http://localhost:port';
  var Link = $resource(BaseURI + '/link', { port: ":1972" });

  $scope.query = function(){
    chromeService.tabs.query({'active': true}, angular.bind(this, function(tab) {
      var link = Link.query({ URI : tab[0].url }).$promise;
      link.then(function(link){
        $scope.saveImage = true; 
        $scope.link = link[0]; 
        $scope.tab = tab[0];
      });
    }));
  }

  $scope.query();

}).$inject = ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$q', 'chromeService', '$resource'];

