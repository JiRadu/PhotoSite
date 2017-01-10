app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster) {
  $scope.logout = function() {
    Data.get('logout').then(function(results) {
      Data.toast(results);
      $location.path('login');
    });
  };
  Data.post('getInfo', { uid: $scope.uid })
    .then(function success(response) {
      $scope.name = response.name;
      $scope.email = response.email;
      $scope.phone = response.phone;
      $scope.address = response.address;
    }, function error(err) {});
  $scope.addAPhoto = function() {
    $location.path('/addPhoto');
  };
  Data.post('getImagesForUser', { uid: $scope.uid })
    .then(function success(response) {
      $scope.photos = response;
    }, function error(err) {});
});
