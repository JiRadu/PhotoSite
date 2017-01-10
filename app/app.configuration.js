var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/login', {
          title: 'Login',
          templateUrl: 'partials/login.html',
          controller: 'authCtrl'
        })
        .when('/logout', {
          title: 'Logout',
          templateUrl: 'partials/logout.html',
          controller: 'logoutCtrl'
        })
        .when('/signup', {
          title: 'Signup',
          templateUrl: 'partials/signup.html',
          controller: 'authCtrl'
        })
        .when('/profile', {
          title: 'Profile',
          templateUrl: 'partials/profile.html',
          controller: 'profileCtrl'
        })
        .when('/', {
          title: 'root',
          controller: 'authCtrl',
          role: '0',
          redirectTo: '/profile'
        })
        .when('/people', {
          title: 'People',
          controller: 'pplCtrl',
          templateUrl: 'partials/people.html'
        })
        .when('/person/:id', {
          templateUrl: 'partials/profile.html',
          controller: 'personCtrl'
        })
        .when('/addPhoto', {
          templateUrl: 'partials/addPhoto.html',
          controller: 'addPhotoCtrl'
        })
        .when('/photos', {
          templateUrl: 'partials/photos.html',
          controller: 'photosCtrl'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }
  ])
  .run(function($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      $rootScope.authenticated = false;
      Data.get('session').then(function(results) {
        if (results.uid) {
          $rootScope.authenticated = true;
          $rootScope.uid = results.uid;
          $rootScope.name = results.name;
          $rootScope.email = results.email;
          if (next.$$route.originalPath === '/signup' || next.$$route.originalPath === '/login') {
            $location.path('/profile');
          }
        } else {
          var nextUrl = next.$$route.originalPath;
          if (nextUrl == '/signup' || nextUrl == '/login') {

          } else {
            $location.path("/login");
          }
        }
      });
    });
  });
