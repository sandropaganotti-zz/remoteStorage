window.remoteStorage.controller('fileListCtrl', function($scope, File){
  $scope.$on('sign-in', function(){
    $scope.$apply(function(){
      $scope.fileList = File.query();
    });
  });
});
