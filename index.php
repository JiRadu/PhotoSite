<!DOCTYPE html>
<html lang="en" ng-app="myApp">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>PhotoSite</title>
      <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/toaster.css" rel="stylesheet">
    <link href="assets/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>a {color: orange;}</style>
  </head>
  <body ng-cloak="">
    <div class="container" style="margin-top:20px;">
      <div data-ng-view="" id="ng-view" class="slide-animation"></div>
    </div>
  </body>
  <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
  <!-- Libs -->
  <script src="js/angular.min.js"></script>
  <script src="js/angular-route.min.js"></script>
  <script src="js/angular-animate.min.js" ></script>
  <script src="js/toaster.js"></script>
  <script src="app/app.configuration.js"></script>
  <script src="app/services/data.js"></script>
  <script src="app/services/directives.js"></script>
  <script src="app/services/photoUpload.js"></script>
  <script src="app/controllers/auth.js"></script>
  <script src="app/controllers/profile.js"></script>
  <script src="app/controllers/people.js"></script>
  <script src="app/controllers/person.js"></script>
  <script src="app/controllers/addPhoto.js"></script>
  <script src="app/controllers/newsfeed.js"></script>
</html>

