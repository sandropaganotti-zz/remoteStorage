window.remoteStorage.directive('rsGoogleLogin', function($rootScope){

  function printJS(){
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  }

  function addMeta(name,content){
    var meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  return {
    restrict: 'E',
    scope: {
      currentUser: '='
    },
    compile: function(element, attributes){
      window.render = window.render || function(){
        $rootScope.$broadcast('init-current-user');
      };

      if(!window.gapi){
        addMeta('google-signin-clientid', attributes.clientId);
        addMeta('google-signin-scope', 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email');
        addMeta('google-signin-requestvisibleactions', 'http://schema.org/AddAction');
        addMeta('google-signin-cookiepolicy', 'single_host_origin');
        printJS();
      }else{
        setTimeout(window.render,0);
      }
    },
    controller: function($scope){

      $scope.signInCallback = function(authResult){
        if(authResult['status']['signed_in']){
            gapi.client.load('plus', 'v1', function() {
              var request = gapi.client.plus.people.get({
                'userId': 'me'
              });
              request.execute($scope.updateUserDetails);
            });
        }else{
          $scope.$apply(function(){
            $scope.currentUser.errorMessage = "Sign-In fallito: " + authResult['error'];
          });
        }
      };

      $scope.updateUserDetails = function(data){
        $scope.$apply(function(){
          $scope.currentUser.userDetails = data;
        });
        $rootScope.$broadcast('sign-in');
      };

      $rootScope.$on('init-current-user', function(){
        $scope.$apply(function(){
          $scope.currentUser = {
            readyToSignIn: true,
            doSignIn: function(){
              gapi.auth.signIn({
                callback: $scope.signInCallback
              });
            }
          };
        });
      });
    }
  }
});
