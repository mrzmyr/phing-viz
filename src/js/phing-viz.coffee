phingVizApp = angular.module 'phingVizApp', []

phingVizApp.controller 'phingVizCtrl', ['$http', '$scope', ($http, $scope) ->

  $scope.data;
  $scope.loading = true

  $http.get('/dist/build.json').success (result) ->
    $scope.data = result.project;
    $scope.loading = false

  $scope.isArray = angular.isArray;

  $scope.getWithoutAttr = (target) ->
    targetClone = angular.extend {}, target
    delete targetClone.attr
    targetClone
]