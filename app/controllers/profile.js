app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $location, Data, toaster) {
  var photosProcessed = 0;
  $scope.profile = true;
  Data.post('getInfo', { uid: $scope.uid })
    .then(function success(response) {
      $scope.name = response.name;
      $scope.email = response.email;
      $scope.phone = response.phone;
      $scope.address = response.address;
    }, function error(err) {});
  Data.post('getImagesForUser', { uid: $scope.uid })
    .then(function success(response) {
      if (response.status !== 'error') {
        $scope.photos = response;
        //Convert mysql date into javascript date
        $scope.photos.forEach(function(photo) {
          //daca descriere = undefined, sa afiseze nimic
          if (photo.descr === 'undefined') {
            photo.descr = '';
          }
          var aux = photo.created.split(/[- :]/);
          photo.created = new Date(Date.UTC(aux[0], aux[1] - 1, aux[2], aux[3] - 2, aux[4], aux[5]));
          //make timeAgo
          photo.timeAgo = getDuration(Date.now() - photo.created).toString();
          aux = photo.timeAgo.split(/[, ]/);
          photo.timeAgo = aux[0] + ' ' + aux[1];
          Data.post('isLikedByUser', { uid: $rootScope.uid, pid: photo.pid }).then(function(result) {
            photo.liked = result;
          });
          photo.comments = [];
          Data.post('getComments', { pid: photo.pid }).then(function(result) {
            if (result && angular.isArray(result)) {
              photo.comments = result;
              photo.comments.forEach(function(comment) {
                var aux = comment.created.split(/[- :]/);
                comment.created = new Date(Date.UTC(aux[0], aux[1] - 1, aux[2], aux[3] - 2, aux[4], aux[5]));
                Data.post('getInfo', { uid: comment.uid }).then(function(result) {
                  comment.posterName = result.name;
                });
                //make timeAgo
                comment.timeAgo = getDuration(Date.now() - comment.created).toString();
                aux = comment.timeAgo.split(/[, ]/);
                comment.timeAgo = aux[0] + ' ' + aux[1];
              });
            }
          });
          photosProcessed++;
          if (photosProcessed === $scope.photos.length) {
            //sort by '-created'
            $scope.photos.sort(function(a, b) {
              return b.created - a.created;
            });
            //THEN sort by no of likes -> the result will be as asked
            $scope.photos.sort(function(a, b) {
              return b.likes - a.likes;
            });
          }
        });
      } else {
        $scope.photos = [];
      }
    });

  $scope.like = function(pid, $index) {
    pending = true;
    if ($scope.photos[$index].liked === 'false') {
      Data.post('likeFromUser', { uid: $rootScope.uid, pid: pid }).then(function(result) {
        if (result && result.status === 'success') {
          $scope.photos[$index].liked = 'true';
          Data.toast(result);
          $scope.photos[$index].likes++;
          pending = false;
        } else {
          pending = false;
          console.log(result);
        }
      }, function(err) {
        pending = false;
        console.log(err);
      });
    } else {
      Data.post('unlikeFromUser', { uid: $rootScope.uid, pid: pid }).then(function(result) {
        if (result && result.status === 'info') {
          $scope.photos[$index].liked = 'false';
          Data.toast(result);
          $scope.photos[$index].likes--;
          pending = false;
        } else {
          pending = false;
          console.log(result);
        }
      }, function(err) {
        pending = false;
        console.log(err);
      });
    }
  };
  $scope.addAPhoto = function() {
    $location.path('/addPhoto');
  };
  $scope.logout = function() {
    Data.get('logout').then(function(results) {
      Data.toast(results);
      $location.path('login');
    });
  };
  $scope.deletePhoto = function(pid, index) {
    Data.post('deletePhoto', { uid: $rootScope.uid, pid: pid })
      .then(function success(response) {
        if (response.status == "success") {
          $scope.photos.splice(index, 1);
        }
        Data.toast(response);
      });
  };
  $scope.postComment = function(index, pid, text) {
    Data.post('postComment', { index: index, pid: pid, text: text, uid: $rootScope.uid }).then(function(result) {
        if (result) {
          if (result.status == 'success') {
            var aux = result.created.split(/[- :]/);
            result.created = new Date(Date.UTC(aux[0], aux[1] - 1, aux[2], aux[3] - 2, aux[4], aux[5]));
            //make timeAgo
            result.timeAgo = getDuration(Date.now() - result.created).toString();
            aux = result.timeAgo.split(/[, ]/);
            result.timeAgo = aux[0] + ' ' + aux[1];
            $scope.photos[index].comments.push({
              pid: pid,
              text: text,
              cid: result.cid,
              uid: $rootScope.uid,
              created: result.created,
              posterName: $rootScope.name,
              timeAgo: result.timeAgo
            });
            Data.toast(result);
          }
        }
      },
      function(err) {
        console.log(err);
      });
  };
  var getDuration = function(millis) {
    var dur = {};
    var units = [
      { label: 'mllis', mod: 1000 },
      { label: 'seconds', mod: 60 },
      { label: 'minutes', mod: 60 },
      { label: 'hours', mod: 24 },
      { label: 'days', mod: 31 }
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
          return dur[u.label] + ' ' + (dur[u.label] == 1 ? u.label.slice(0, -1) : u.label);
        })
        .join(', ');
    };
    return dur;
  };
});
