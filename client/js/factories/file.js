window.remoteStorage.factory('File', function($resource, baseRoot){
  return $resource(baseRoot + '/files/:id');
});
