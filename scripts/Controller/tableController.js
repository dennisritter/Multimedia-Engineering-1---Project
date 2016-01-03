angular.module('petsitting').controller('TableController', ['$scope', 'StorageService', function ($scope, StorageService, ngAnimate) {

  $scope.users = [];

  // Loads data into scope
  StorageService.getAll().then( function (data) {
    for ( var i = 0; i < data.length; i++ ) {
      data[i].position = {
        latitude: data[i].latitude,
        longitude: data[i].longitude
      };
    }
    $scope.users = data;
  });

  $scope.map = {
    zoom: 13
  };

  // Toggles details-row for a table entry
  $scope.toggleDetails = function($index){
    $scope.activeRow = $scope.activeRow == $index ? -1 : $index;
    //Visibility of contact information
    $scope.isVisible = false;
  }



}]);