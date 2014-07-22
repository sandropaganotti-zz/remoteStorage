describe('File resource', function(){

  beforeEach(module('remoteStorageApp'));

  it('exists', function(){
    inject(function(File){
      expect(File).to.be.defined;
    });
  });

});
