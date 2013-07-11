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
  
  describe('transform', function() {
    
    describe('pattern with a placeholder', function() {
      var path = express.transform('/user/:id', { id: '1234' });
    
      it('should fully expand template', function() {
        expect(path).to.be.equal('/user/1234');
      });
    });
    
    describe('pattern with a placeholder followed by a segment', function() {
      var path = express.transform('/user/:id/picture', { id: '1234' });
    
      it('should fully expand template', function() {
        expect(path).to.be.equal('/user/1234/picture');
      });
    });
    
    describe('pattern with two consequtive placeholders', function() {
      var path = express.transform('/user/:id/:username', { id: '1234', username: 'bob' });
    
      it('should fully expand template', function() {
        expect(path).to.be.equal('/user/1234/bob');
      });
    });
    
    describe('pattern with optional placeholder preceded by dot', function() {
      var pattern = '/products.:format?';
    
      it('should expand optional placeholder when present', function() {
        expect(express.transform(pattern, { format: 'json' })).to.be.equal('/products.json');
      });
      it('should remove optional placeholder when not present', function() {
        expect(express.transform(pattern, {})).to.be.equal('/products');
      });
    });
    
    describe('failing to subtitute a required placeholder', function() {
      it('should throw an error', function() {
        expect(function() {
          express.transform('/user/:id', { xid: '1234' });
        }).to.throw(Error)
          .and.to.throw('Failed to substitute :id in pattern /user/:id');
      });
    });
    
  });
  
});
