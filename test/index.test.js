var urlpattern = require('index');

describe('urlpattern', function() {
  
  it('should export express-style pattern', function() {
    expect(urlpattern.express).to.be.an('object');
    expect(urlpattern.express.parse).to.be.a('function');
    expect(urlpattern.express.transform).to.be.a('function');
  });
  
});
