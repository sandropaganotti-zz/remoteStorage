window.remoteStorage = angular.module('remoteStorageApp', ['ngResource'])
  .constant('baseRoot','http://localhost:3000/api')
  .config(function($httpProvider){

    $httpProvider.interceptors.push(function($q, $rootScope){
      return {
        request: function(config){
          if($rootScope.currentUser && $rootScope.currentUser.userDetails){
            config.headers['X-User'] = $rootScope.currentUser.userDetails.emails[0].value;
          }
          return config || $q.when(config);
        }
      }
    });
  });
