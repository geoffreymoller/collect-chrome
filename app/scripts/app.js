'use strict';

var app = angular.module('collect', ['ngResource']);

app.controller('CollectController', function($scope, $rootScope, $http, $location, $routeParams, $q, $chromeService, $resource, $model) {

  var Link = $model['Link']();
  $scope.saveImage = true; 

  $scope.query = function(){
    $chromeService.tabs.query({'active': true, 'currentWindow': true}, $scope.tabQueryHandler);
  };

  $scope.tabQueryHandler = function(tab){
    $scope.tab = tab[0];
    var link = Link.query({ URI : $scope.tab.url });
    link.$promise.then($scope.linkSuccess, $scope.linkError);
  }

  $scope.linkSuccess = function(link){
    $scope.loaded = true; 
    if(link && link[0]){
      $scope.existing = true;
      $scope.link = link[0];
    }
    else {
      $scope.existing = false;
      $scope.link = new Link({ value: { uri: $scope.tab.url, title: $scope.tab.title }});
    }
  }

  $scope.linkError = function(link){
    $scope.error = {
      status: true 
      , message: link.config.url
    }
  }

  $scope.submit = function(){
    window.close();
    $scope.polish($scope.link).$save();
  };

  $scope.goToURI = function(){
    chrome.tabs.create({'url': $scope.link.value.uri});
  };

  $scope.polish = function(link){
    if(!angular.isArray(link.value.tags)){
      link.value.tags = $scope.polishTags(link.value.tags);
    }
    return link;
  };

  $scope.polishTags = function(tags){
    tags = tags.replace(/,/g, ' ');
    tags = tags.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
    return tags.split(' ');
  }

  $scope.query();

}).$inject = ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$q', '$chromeService', '$resource', '$model'];

app.service('$chromeService', function() {
  return chrome;
});

app.service('$model', function($resource) {
  return {
    getBaseURI: function(){
      return 'http://bookmarken.herokuapp.com';
    }
    , Link: function(){
      return $resource(this.getBaseURI() + '/link');
    }
  }
});

