var app = require('./../app');
var expect = require('chai').expect;
var request = require('supertest');

describe('remoteStorage basic behavior', function(){

  it('app is created', function(){
    expect(app).to.exist;
  });

  it('answers 200 on its root endpoint', function(done){
    request(app).get('/').expect(200, done);
  });

});
