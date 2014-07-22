describe('rs-googleLogin', function(){
  var markup = '<rs-google-login current-user="username" client-id="711683523030-0tprl9itf5p6od9lk5f93b6i7uot1tum.apps.googleusercontent.com">';

  beforeEach(module('remoteStorageApp'));

  it('exists', function(){
    inject(function($injector){
      expect($injector.has('rsGoogleLoginDirective')).to.be.true;
    });
  });

  describe('the compile phase', function(){
    var $compile;

    beforeEach(function(){
      inject(function(_$compile_){
        $compile = _$compile_;
      });
    });

    it('calls the render function when loaded', function(done){
      window.render = function(){
        done();
      };
      $compile(markup);
    });

    it('proper attach the right meta', function(done){
      window.render = function(){
        var meta = document.querySelector('meta[name="google-signin-clientid"]');
        expect(meta.content).to.be.equal('711683523030-0tprl9itf5p6od9lk5f93b6i7uot1tum.apps.googleusercontent.com');
        done();
      };
      $compile(markup);
    });

    afterEach(function(){
      delete window.render;
    });

  });

  describe('the behavior phase', function(){
    var $compile, $rootScope;

    beforeEach(function(){
      inject(function(_$rootScope_, _$compile_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
      });
    });

    it('expose the doSignIn function', function(done){
      var googleSignIn = $compile(markup)($rootScope);
      $rootScope.$watch('username', function(){
        if($rootScope.username && $rootScope.username.readyToSignIn && !$rootScope.username.userDetails){
          var signInOk = gapi.auth.signIn;
          gapi.auth.signIn = function(){
            gapi.auth.signIn = signInOk;
            done();
          }
          $rootScope.username.doSignIn();
        }
      },true);
    });

    it('handle authentication error', function(){
      var googleSignIn = $compile(markup)($rootScope);
      var scope = googleSignIn.isolateScope();
      scope.currentUser = {};
      scope.signInCallback({
        status: {
          signed_in: false,
        },
        error: 'just a test'
      });
      expect($rootScope.username.errorMessage).to.be.equal('Sign-In fallito: just a test');
    });

    it('gets the data from the user', function(){
      var googleSignIn = $compile(markup)($rootScope);
      var scope = googleSignIn.isolateScope();
      scope.currentUser = {};
      scope.updateUserDetails({
        id: '+SandroPaganotti'
      });
      expect($rootScope.username.userDetails.id).to.be.equal('+SandroPaganotti');
    });

  });

});
