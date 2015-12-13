angular.module('petsitting').controller( 'SubmitController', [ '$scope', 'StorageService', function ( $scope, StorageService ) {

  $scope.model = StorageService.getEmptyModel();
  $scope.now = new Date();
  $scope.animalTypes = {
    dog: 'Hund',
    cat: 'Katze',
    mouse: 'Maus',
    bird: 'Vogel'
  };

  $scope.save = function () {
    var form = $scope.submitForm;

    // If submitForm is invalid, mark all inputs as dirty/touched to force error message and do not actually submit the data.
    if ( !form.$valid ) {
      for ( var key in form ) {
        if ( !form.hasOwnProperty( key ) || typeof form[key] !== 'object' || !form[key].hasOwnProperty('$modelValue') ) {
          continue;
        }

        var input = form[key];
        input.$dirty = true;
        input.$touched = true;
      }

      return;
    }

    console.log( 'submitting...', $scope.model );
  };

} ] );