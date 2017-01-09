app.controller('authCtrl', function($scope, $rootScope, $routeParams, $location, Data) {
  //initially set those objects to null to avoid undefined error
  $scope.login = {};
  $scope.signup = {};
  $scope.doLogin = function(customer) {
    Data.post('login', {
      customer: customer
    }).then(function(results) {
      Data.toast(results);
      if (results.status == "success") {
        $rootScope.justLoggedIn = true;
        $location.path('profile');
      }
    });
  };
  $scope.signup = { email: '', password: '', name: '', phone: '', address: '' };
  $scope.signUp = function(customer) {
    Data.post('signUp', {
      customer: customer
    }).then(function(results) {
      Data.toast(results);
      if (results.status == "success") {
        $rootScope.justLoggedIn = true;
        $location.path('profile');
      }
    });
  };
});
