app.controller('pplCtrl', function($scope, $rootScope, $routeParams, $location, Data) {
  $scope.logout = function() {
    Data.get('logout').then(function(results) {
      Data.toast(results);
      $location.path('login');
    });
  };
  Data.get('getPeople')
    .then(function success(response) {
      $scope.people = response;
    }, function error(err) {});
  $scope.addAPhoto = function() {
    $location.path('/addPhoto');
  };
  $scope.routeChange = function(uid) {
    if (uid !== $rootScope.uid) {
      $location.path('/person/:' + uid);
    } else {
      $location.path('/profile');
    }
  };
});
