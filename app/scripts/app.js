'use strict';

var app = angular.module('collect', ['ngResource']);

app.service('chromeService', function() {
  return chrome;
});

app.controller('CollectController', function($scope, $rootScope, $http, $location, $routeParams, $q, chromeService, $resource) {

  var BaseURI = 'http://localhost:port';
  var Link = $resource(BaseURI + '/link', { port: ":1972" });

  $scope.query = function(){

    chromeService.tabs.query({'active': true}, tabQueryHandler); 

    function tabQueryHandler(tab) {
      var link = Link.query({ URI : tab[0].url });
      link.$promise.then(function(link){
        $scope.saveImage = true; 
        $scope.loaded = true; 
        $scope.tab = tab[0];
        if(link[0]){
          $scope.existing = true;
          $scope.link = link[0];
        }
        else {
          $scope.existing = false;
          $scope.link = new Link({ value: { uri: $scope.tab.url, title: $scope.tab.title }});
        }
      });
    };

  }

  $scope.submit = function(){
    $scope.link.$save();
  }

  $scope.query();

}).$inject = ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$q', 'chromeService', '$resource'];

