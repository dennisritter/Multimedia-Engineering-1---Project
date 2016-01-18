angular.module('petsitting').controller( 'SubmitController', [ '$scope', 'StorageService', 'FormMessages', 'AnimalTypes', '$routeParams',
  function ( $scope, StorageService, FormMessages, AnimalTypes, $routeParams ) {

  $scope.model = StorageService.getEmptyModel();
  $scope.now = new Date();
  $scope.animalTypes = AnimalTypes;

  $scope.messages = new FormMessages({
    saved: false,
    dataInvalid: false,
    unknownError: false
  });

  var initData = function ( id ) {

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

    $scope.messages.loadingOn();
    StorageService.persist( $scope.model )
      .then( function () {
        $scope.messages.saved = true;
      }, function ( data ) {
        $scope.messages.handleErrorData( data );
      } )
      .finally( $scope.messages.loadingOff );
  };

} ] );