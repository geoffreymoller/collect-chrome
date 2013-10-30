'use strict';

describe('Controller: CollectController', function () {

  beforeEach(module('collect'));

  var controller, scope, mockTabs;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {

    scope = $rootScope.$new();
    $httpBackend.when('GET', 'http://127.0.0.1:1972/link?URI=foobar').respond([])
    mockTabs = {
      query: function(params, callback){
        var tab = {
          active: true
          , currentWindow: true
          , favIconUrl: "http://docs.angularjs.org/favicon.ico"
          , highlighted: true
          , id: 1004
          , incognito: false
          , index: 2
          , pinned: false
          , selected: true
          , status: "complete"
          , title: "AngularJS: $controller"
          , url: "foobar"
          , windowId: 136
        }
        callback([tab]);
      }
    }

    controller = $controller('CollectController', {
      $scope: scope
      , $chromeService: {
        tabs: mockTabs 
      }
    });

  }));

  describe('viewstate', function(){

    var link; 

    beforeEach(function(){
      link = {
        config: {
          url: 'foobar'
        }
      };
    });

    it('sets loaded and error scope states', function () {
      spyOn(scope, 'tabQueryHandler');
      scope.query();
      expect(scope.tabQueryHandler).toHaveBeenCalled();
      expect(scope.loaded).toBeFalsy();
      expect(scope.error).toBeFalsy();
      scope.linkSuccess();
      expect(scope.loaded).toBe(true);
      scope.linkError(link);
      expect(scope.error.status).toBe(true);
      expect(scope.error.message).toBe(link.config.url);
    });

  });

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
