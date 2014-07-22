describe('fileList controller', function(){

  beforeEach(module('remoteStorageApp'));

  it('exists', function(){
    inject(function($controller, $rootScope, $http){
      expect(function(){
        $controller('fileListCtrl', {
          $scope: $rootScope.$new(),
          $http: $http
        });
      }).to.not.throw();
    });
  });

  describe('works as expected', function(){
    var controller, rootScope, scope, $httpBackend, baseRoot;

    beforeEach(function(){
      inject(function($controller, $rootScope, File, $injector, _baseRoot_){
        baseRoot = _baseRoot_;
        scope = $rootScope.$new();
        rootScope = $rootScope;
        controller = $controller('fileListCtrl', {
          $scope: scope,
          File: File
        });
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', baseRoot + '/files').respond([
          {
            name: 'la gioconda.pdf'
          }
        ]);
      });
    });

    it('respond to sign-in', function(){
      scope.$emit('sign-in');
      $httpBackend.flush();
      expect(scope.fileList[0].name).to.be.equal('la gioconda.pdf');
    });

    it('sends the user-email as an header', function(){
      $httpBackend.expectGET(baseRoot + '/files', {
        'X-User': 'sandro.paganotti@gmail.com',
        'Accept': 'application/json, text/plain, */*'
      });
      rootScope.currentUser = {
        userDetails: {
          emails: [{
            value: 'sandro.paganotti@gmail.com'
          }]
        }
      };
      scope.$emit('sign-in');
      $httpBackend.flush();
    });

  });

});
