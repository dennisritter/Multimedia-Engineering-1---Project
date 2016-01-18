angular.module('petsitting').controller('TableController', ['$scope', 'StorageService', function ( $scope, StorageService ) {

  $scope.users = [];

  var loadData = function () {
    StorageService.getAll().then( function (data) {
      for ( var i = 0; i < data.length; i++ ) {
        data[i].position = {
          latitude: data[i].latitude,
          longitude: data[i].longitude
        };
      }
      $scope.users = data;
    });
  };

  loadData();

  //map object for google-maps
  $scope.map = {
    zoom: 13
  };

  // Toggles details-row for a table entry
  $scope.toggleDetails = function($index){
    $scope.activeRow = $scope.activeRow == $index ? -1 : $index;
    //Visibility of contact information
    $scope.isVisible = false;
  };

  $scope.remove = function ( id ) {
    if ( !confirm("Wollen Sie diesen Eintrag wirklich löschen?") ) {
      return;
    }

    StorageService.remove( id )
      .then( function () {
        for ( var i = 0; i < $scope.users.length; i++ ) {
          if ( $scope.users[i].id == id ) {
            $scope.users.splice( i, 1 );
            break;
          }
        }
      } );
  };

}]);