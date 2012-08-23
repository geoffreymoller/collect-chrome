describe('collect-chrome', function(){

  var _collect;

  describe('tag parsing', function(){

    var newTags = 'one two three';

    beforeEach(function(){
      _collect = new Collect(); 
    })  

    it('returns a fit tag list as-is', function(){
      var tags = 'one two three';
      expect(_collect.getTags(tags)).toEqual(newTags);
    });

    it('removes extra spaces from a tag list', function(){
      var tags = '  one    two   three           ';
      expect(_collect.getTags(tags)).toEqual(newTags);
    });

    it('removes commas from a tag list', function(){
      var tags = 'one,two,three ';
      expect(_collect.getTags(tags)).toEqual(newTags);
    });

    it('removes extra spaces and commas from a tag list', function(){
      var tags = '  one ,   two,    three';
      expect(_collect.getTags(tags)).toEqual(newTags);
    });

  });

});
