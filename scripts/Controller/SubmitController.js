angular.module('petsitting').controller( 'SubmitController', [ '$scope', 'StorageService', function ( $scope, StorageService ) {

  $scope.model = StorageService.getEmptyModel();
  $scope.now = new Date();
  $scope.animalTypes = {
    dog: 'Hund',
    cat: 'Katze',
    mouse: 'Maus',
    bird: 'Vogel'
  };

  $scope.save = function ( form ) {
    if ( !form.$valid ) {
      console.error( 'Form invalid', form );
      return;
    }
    console.log( 'save', $scope.model );
  };

} ] );