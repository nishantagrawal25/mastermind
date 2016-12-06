var services = angular.module('services', [])
services.service('utils', ['$http', '$q', function($http, $q) {
  return {

    get : function(url, params) {
      url = $routeParams.catalogue + url;
      var deferred = $q.defer();
      $http.get(url, {
        params : params
      }).then(function(response) {
        if (response.status == 200) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise;
    },

    post : function(url, params, data) {
      url = $routeParams.catalogue + url;
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : url,
        params : params,
        data : data,
      }).then(function(response) {
        if (response.status == 200) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise
    },
    
    put : function(url, params,data) {
      url = $routeParams.catalogue + url;
      var deferred = $q.defer();
      $http({
        method : 'PUT',
        url : url,
        params : params,
        data : data,
      }).then(function(response) {
        if (response.status == 200) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise;
    },
  }
}])