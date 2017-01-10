app.controller('newsfeedCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster) {
  $scope.logout = function() {
    Data.get('logout').then(function(results) {
      Data.toast(results);
      $location.path('login');
    });
  };
  $scope.like = function(pid, $index) {
    if ($scope.recentPhotos[$index].liked === 'false') {
      Data.post('likeFromUser', { uid: $rootScope.uid, pid: pid }).then(function(result) {
        if (result) {
          $scope.recentPhotos[$index].liked = 'true';
          Data.toast(result);
          $scope.recentPhotos[$index].likes++;
        } else {
          console.log(err);
        }
      }, function(err) {
        console.log(err);
      });
    } else {
      Data.post('unlikeFromUser', { uid: $rootScope.uid, pid: pid }).then(function(result) {
        if (result) {
          $scope.recentPhotos[$index].liked = 'false';
          Data.toast(result);
          $scope.recentPhotos[$index].likes--;
        } else {
          console.log(err);
        }
      }, function(err) {
        console.log(err);
      });
    }
  };
  $scope.addAPhoto = function() {
    $location.path('/addPhoto');
  };
  // TODO: PUT A LIMIT HERE
  Data.get('recentPhotos').then(function(results) {
      if (results.status !== 'error') {
        $scope.recentPhotos = results;
      } else {
        $scope.recentPhotos = [];
      }
      //Convert mysql date into javascript date
      $scope.recentPhotos.forEach(function(photo) {
        var aux = photo.created.split(/[- :]/);
        photo.created = new Date(Date.UTC(aux[0], aux[1] - 1, aux[2], aux[3] - 2, aux[4], aux[5]));
        photo.timeAgo = getDuration(Date.now() - photo.created).toString();
        aux = photo.timeAgo.split(/[, ]/);
        photo.timeAgo = aux[0] + " " + aux[1];
        Data.post('getInfo', { uid: photo.uid }).then(function(result) {
          photo.PosterName = result.name;
        });
        Data.post('isLikedByUser', { uid: $rootScope.uid, pid: photo.pid }).then(function(result) {
          photo.liked = result;
        });
      });
    },
    function(err) {
      console.log(err);
    });
  var getDuration = function(millis) {
    var dur = {};
    var units = [
      { label: "millis", mod: 1000 },
      { label: "seconds", mod: 60 },
      { label: "minutes", mod: 60 },
      { label: "hours", mod: 24 },
      { label: "days", mod: 31 }
    ];
    // calculate the individual unit values...
    units.forEach(function(u) {
      millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
    });
    // convert object to a string representation...
    var nonZero = function(u) { return dur[u.label]; };
    dur.toString = function() {
      return units
        .reverse()
        .filter(nonZero)
        .map(function(u) {
          return dur[u.label] + " " + (dur[u.label] == 1 ? u.label.slice(0, -1) : u.label);
        })
        .join(', ');
    };
    return dur;
  };
});
