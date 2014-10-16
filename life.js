lifeApp = angular.module('lifeApp',[]);

lifeApp.controller('lifeCtrl',function($scope,$interval){
  var n = 25, m = 50;

  // current grid
  $scope.grid = [];
  for(i = 0; i < n; i++){
    $scope.grid.push(new Array(m));
  }

  // successor
  $scope.next = [];
  for(i = 0; i < n; i++){
    $scope.next.push(new Array(m));
  }

  $scope.toggle = function(i,j){
    $scope.grid[i][j] = !$scope.grid[i][j];
  }

  $scope.run = function(){
    $scope.running = $interval(function(){
      $scope.step();
    },500);
  }

  $scope.random = function(){
    for(i = 0; i < n; i++){
      for(j = 0; j < m; j++){
        p = Math.round(Math.random()*10) + 1;
        if (p > 6){
          $scope.grid[i][j] = true;
        } else {
          $scope.grid[i][j] = false;
        }
      }
    }
  }

  $scope.stop = function(){
    $interval.cancel($scope.running);
    $scope.running = null;
  }

  $scope.step = function(){
    for(i = 0; i < $scope.grid.length; i++){
      row = $scope.grid[i];
      for(j = 0; j < row.length; j++){
        k = $scope.neighbors(i,j);
        if ($scope.grid[i][j]){
          if ( k < 2 || k > 3 )
            $scope.next[i][j] = false;
          else
            $scope.next[i][j] = true;
        } else {
          if (k == 3)
            $scope.next[i][j] = true;
          else
            $scope.next[i][j] = false;
        }
      }
    }

    temp = $scope.grid;
    $scope.grid = $scope.next;
    $scope.next = temp;
  }

  $scope.neighbors = function(i,j){
    return $scope.isOn(i-1,j-1) +
    $scope.isOn(i-1,j) +
    $scope.isOn(i-1,j+1) +
    $scope.isOn(i,j-1) +
    $scope.isOn(i,j+1) +
    $scope.isOn(i+1,j-1) +
    $scope.isOn(i+1,j) +
    $scope.isOn(i+1,j+1);
  }

  $scope.isOn = function(i,j){
    if (i < 0 || j < 0){
      return 0;
    }

    if (i >= $scope.grid.length){
      return 0;
    }

    if (j >= $scope.grid[i].length){
      return 0;
    }

    return $scope.grid[i][j] ? 1 : 0;
  }

});
