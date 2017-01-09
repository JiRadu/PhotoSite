app.factory("Data", ['$http', 'toaster',
  function($http, toaster) { // This service connects to our REST API

    var serviceBase = 'api/v1/';
    var extension = '.php';

    var obj = {};
    obj.toast = function(data) {
      toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
    };
    obj.get = function(q) {
      return $http.get(serviceBase + q + extension).then(function(results) {
        return results.data;
      });
    };
    obj.post = function(q, object) {
      return $http.post(serviceBase + q + extension, object).then(function(results) {
        return results.data;
      });
    };
    obj.put = function(q, object) {
      return $http.put(serviceBase + q + extension, object).then(function(results) {
        return results.data;
      });
    };
    obj.delete = function(q) {
      return $http.delete(serviceBase + q + extension).then(function(results) {
        return results.data;
      });
    };

    return obj;
  }
]);
