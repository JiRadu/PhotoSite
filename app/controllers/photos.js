app.controller('photosCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster) {
  $scope.logout = function() {
    Data.get('logout').then(function(results) {
      Data.toast(results);
      $location.path('login');
    });
  };
  $scope.addAPhoto = function() {
    $location.path('/addPhoto');
  };
});
