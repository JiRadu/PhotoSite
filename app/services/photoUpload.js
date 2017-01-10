app.service('photoUpload', ['$http', function($http) {
  this.uploadFileToUrl = function(file, descr, uid, callback) {
    var loading = true;
    var fd = new FormData();
    fd.append('file', file);
    fd.append('name', name);
    fd.append('descr', descr);
    fd.append('uid', uid);
    $http.post('/api/v1/upload_photo.php', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined, 'Process-Data': false }
      })
      .success(function(response) {
        callback(null, response);
      })
      .error(function(err) {
        callback('err', err);
      });
  };
}]);
