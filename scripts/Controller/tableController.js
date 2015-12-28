angular.module('petsitting').controller('TableController', ['$scope', 'StorageService', function ($scope, StorageService) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  //Saves existent userdata in data attribute
  StorageService.getAll().then(function (data) {
    $scope.users = data;
  });
}]);