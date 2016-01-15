angular.module('petsitting').controller( 'SubmitController', [ '$scope', 'StorageService', 'FormMessages', 'AnimalTypes', function ( $scope, StorageService, FormMessages, AnimalTypes ) {

  $scope.model = StorageService.getEmptyModel();
  $scope.now = new Date();
  $scope.animalTypes = AnimalTypes;

  $scope.messages = new FormMessages({
    saved: false,
    dataInvalid: false,
    unknownError: false
  });

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
        if ( data.error ) {
          $scope.messages[ data.error ] = true;
          //TODO: (?) kommt hier ein Methodenaufruf zur identifikation des Fehlers?
          //var errorMessage = identifyError( data.error );
        } else {
          data.messages.unknownError = true;
        }
      } )
      .finally( $scope.messages.loadingOff );
  };

  //function identifyError( error ){
  //  switch ( error ) {
  //    case "error1":
  //      return "Message for error 1"
  //      break;
  //    case "error2":
  //      return "Message for error 2"
  //      break;
  //    default:
  //      return "Default Message"
  //      break;
  //  }
  //}

} ] );