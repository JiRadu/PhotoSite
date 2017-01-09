app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster) {
  if ($rootScope.justLoggedIn === true) {
    toaster.pop('success', 'Bine ai venit', "Bine ai venit, " + $rootScope.name + " !" + "<br>" + "Aceasta este pagina ta de profil", 10000, 'trustedHtml');
  }
  $rootScope.justLoggedIn = false;
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
});
