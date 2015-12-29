angular.module('petsitting').controller('TableController', ['$scope', 'StorageService', 'uiGmapIsReady', function ($scope, StorageService, uiGmapIsReady) {

  // Saves existing user data in data model
  StorageService.getAll().then(function (data) {
    $scope.users = data;
  });

  //uiGmapIsReady.promise(10).then(function(instances){
  //  instances.forEach(function(instance){
  //    var map = instance.map;
  //    var uuid = map.uiGmap_id;
  //    var mapInstanceNumber = instance.instance; // Starts at 1.
  //  });
  //});

  // Loads Google Map centered at the users address
  $scope.getGoogleMap = function($index){
    $scope.map = {
      center: {
        latitude : $scope.users[$index].latitude,
        longitude: $scope.users[$index].longitude
      },
      zoom: 8
    };
  }

  // Toggles details-row for a table entry
  $scope.toggleDetails = function($index){
    $scope.activeRow = $scope.activeRow == $index ? -1 : $index;
  }

}]);