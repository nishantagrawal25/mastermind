var app = angular.module('app', ['services', 'ngRoute', 'ui.bootstrap', 'ngTable' ]);

app.config([ '$routeProvider', '$httpProvider', function($routeProvider){
  $routeProvider.when('/competitions', {
    templateUrl : '/partials/competitions.html',
    controller : 'CompetitionsCtrl'
  }).when('/competition/:id', {
    templateUrl : '/partials/competition-details.html',
    controller : 'LeagueCtrl'
  }).when('/team/:teamId/overview', {
    templateUrl : '/partials/team-details.html',
    controller : 'TeamDetailsCtrl'
  }).otherwise({
    redirectTo : '/competitions'
  });

}]);

app.directive('countdown', ['$interval', 'utils', function ($interval, utils) {
      return {
          restrict: 'A',
          scope: { date: '@' },
          link: function (scope, element) {
              var future;
              future = new Date(scope.date);
              $interval(function () {
                  var diff;
                  diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                  return element.text(utils.dhms(diff));
              }, 1000);
          }
      };
  }
])

app.controller('CompetitionsCtrl', ['$scope', 'utils', function($scope, utils){

  utils.getCompetitions().then(function(data) {
    $scope.competitions = data
    console.log(data);
  }, function(err) {
    console.log(err);
  });
  
}])

app.controller('LeagueCtrl', ['$scope', '$routeParams', 'utils', '$location', function($scope, $routeParams, utils, $location){

  var id = $routeParams.id;
  function getLeagueTable(id) {
    utils.getLeagueTable(id).then(function(data) {
      $scope.standing = data;
      console.log(data);
    }, function (err) {
      console.log(err);
    })
  }

  getLeagueTable(id);

  $scope.getTeamDetails = function(club) {
    utils.setValue(club._links.team.href);
    var lastIndexOf = club._links.team.href.lastIndexOf('/');
    var teamId = club._links.team.href.substring(lastIndexOf + 1);
    $location.path('/team/' + teamId + '/overview');
  }

  
}]);

app.controller('TeamDetailsCtrl', ['$scope','$routeParams', 'utils', function($scope, $routeParams, utils){

  var teamId = $routeParams.teamId;
  getTeamDetails(teamId);

  function getTeamDetails(teamId) {
    utils.getTeamDetails(teamId).then(function(data) {
      $scope.teamData = data;
      console.log(data);
    }, function(err) {
      console.log(err);
    })
  }

  $scope.tabs = [ {
      title : "Fixtures",
      content : "/partials/fixtures.html",
      active : true,
    }, {
      title : "Players",
      content : "/partials/players.html",
      active : false,
    }];

    $scope.setIdx = function($index) {
      $scope.tabIdx = $index;
    }

}]);

app.controller('FixturesCtrl', ['$scope', '$routeParams', 'utils', function($scope, $routeParams, utils){

  var teamId = $routeParams.teamId;
  getFixtures(teamId);

  function getFixtures(teamId) {
    utils.getFixtures(teamId).then(function (data) {
      $scope.fixtures = data.fixtures;
      console.log(data);
    }, function(err) {
      console.log(err);
    })
  }

  $scope.customFunction = function(fixture) {
    return fixture.status != 'FINISHED';
  }

  
}]);

app.controller('PlayersCtrl', ['$scope', '$routeParams', 'utils', function($scope, $routeParams, utils){

  var teamId = $routeParams.teamId;
  getPlayers(teamId);

  function getPlayers(teamId) {
    utils.getPlayers(teamId).then(function (data) {
      $scope.players = data.players;
    }, function(err) {
      console.log(err);
    })
  }

  
}])