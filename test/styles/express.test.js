var express = require('styles/express');

describe('express', function() {
  
  it('should export parse and transform', function() {
    expect(express.parse).to.be.a('function');
    expect(express.transform).to.be.a('function');
  });
  
  describe('parse', function() {
    
    describe('pattern with a placeholder', function() {
      var keys = [];
      var rx = express.parse('/user/:id', keys);
    
      it('should return a regexp', function() {
        expect(rx).to.be.an.instanceof(RegExp);
        expect(rx.toString()).to.be.equal('/^\\/user\\/(?:([^\\/]+?))\\/?$/i');
      });
      
      it('should supply keys', function() {
        expect(keys).to.have.length(1);
        expect(keys[0].name).to.be.equal('id');
        expect(keys[0].optional).to.be.false;
      });
    });
    
    describe('pattern with two placeholders', function() {
      var keys = [];
      var rx = express.parse('/forum/:fid/thread/:tid', keys);
    
      it('should return a regexp', function() {
        expect(rx).to.be.an.instanceof(RegExp);
        expect(rx.toString()).to.be.equal('/^\\/forum\\/(?:([^\\/]+?))\\/thread\\/(?:([^\\/]+?))\\/?$/i');
      });
      
      it('should supply keys', function() {
        expect(keys).to.have.length(2);
        expect(keys[0].name).to.be.equal('fid');
        expect(keys[0].optional).to.be.false;
        expect(keys[1].name).to.be.equal('tid');
        expect(keys[1].optional).to.be.false;
      });
    });
    
    describe('pattern as regexp', function() {
      var keys = [];
      var rx = express.parse(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, keys);
    
      it('should return a regexp', function() {
        expect(rx).to.be.an.instanceof(RegExp);
        expect(rx.toString()).to.be.equal('/^\\/commits\\/(\\w+)(?:\\.\\.(\\w+))?$/');
      });
      
      it('should not supply keys', function() {
        expect(keys).to.have.length(0);
      });
    });
    
  });
  
});
