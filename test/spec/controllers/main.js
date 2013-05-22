'use strict';

describe('Controller: CollectController', function () {

  beforeEach(module('collect'));

  var controller, scope;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {

    scope = $rootScope.$new();
    //$httpBackend.whenGET('/link/http%3A//www.cnn.com').respond([])
    controller = $controller('CollectController', {
      $scope: scope
      , chromeService: {
        tabs: {
          query: function(){
            return {
              active: true
              , favIconUrl: "http://docs.angularjs.org/favicon.ico"
              , highlighted: true
              , id: 1004
              , incognito: false
              , index: 2
              , pinned: false
              , selected: true
              , status: "complete"
              , title: "AngularJS: $controller"
              , url: "http://docs.angularjs.org/api/ng.$controller"
              , windowId: 136
            }
          }
        }
      }
    });

  }));


  describe('tags', function(){

    it('should split tags and produce an array', function () {
      var tags = '  foo   bar   baz ';
      var expected = ['foo', 'bar', 'baz'];
      var returned = scope.polishTags(tags);
      expect(returned).toEqual(expected);
      var tags = 'foo bar baz';
      var returned = scope.polishTags(tags);
      expect(returned).toEqual(expected);
      var tags = 'foo,bar,baz';
      var returned = scope.polishTags(tags);
      expect(returned).toEqual(expected);
      var tags = ' foo   bar,baz';
      var returned = scope.polishTags(tags);
      expect(returned).toEqual(expected);
      var tags = ',, foo   bar  ,   baz';
      var returned = scope.polishTags(tags);
      expect(returned).toEqual(expected);
    });

  });

});
