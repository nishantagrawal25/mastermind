var services = angular.module('services', [])
services.service('utils', ['$http', '$q', function($http, $q) {
  var baseUrl = "http://api.football-data.org";
  var value = "";
  return {

    setValue : function (url) {
      value = url;
    },

    getValue : function() {
      return value;
    },

    getCompetitions : function () {
      return this.get(baseUrl + "/v1/competitions")
    },

    getLeagueTable : function (id) {
      return this.get(baseUrl + '/v1/competitions/' + encodeURIComponent(id) + '/leagueTable')
    },

    getTeamDetails : function(id) {
      return this.get(baseUrl + '/v1/teams/' + encodeURIComponent(id))
    },

    getFixtures : function(teamId) {
      return this.get(baseUrl + '/v1/teams/' + encodeURIComponent(teamId) + '/fixtures')
    },

    getPlayers : function(teamId) {
      return this.get(baseUrl + '/v1/teams/' + encodeURIComponent(teamId) + '/players')
    },

    get : function(url, params) {
      var deferred = $q.defer();
      $http.get(url, {
        params : params,
        headers : {
          "X-Auth-Token" : "7b4348081a16421a91ec522aec2515b3"
        }
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
    
  }
}])