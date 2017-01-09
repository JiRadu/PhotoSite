app.controller('personCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster) {
  $scope.logout = function() {
    Data.get('logout').then(function(results) {
      Data.toast(results);
      $location.path('login');
    });
  };
  var personUid = $location.url().slice(9, $location.url().length);
  Data.post('getInfo', { uid: personUid })
    .then(function success(response) {
      $scope.name = response.name;
      $scope.email = response.email;
      $scope.phone = response.phone;
      $scope.address = response.address;
    }, function error(err) {});
});
