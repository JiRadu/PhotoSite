app.controller('addPhotoCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster, photoUpload) {

  $scope.submit = function(addPhotoForm) {
    var photo = $scope.newPhoto;
    var descr = $scope.descr;
    photoUpload.uploadFileToUrl(photo, descr, $rootScope.uid, function(err, done) {
      if (!err) {
        console.log(done);
        Data.toast(done);
      } else {
        Data.toast(err);
        console.log(err);
      }
    });
  };
});
