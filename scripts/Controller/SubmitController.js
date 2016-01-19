angular.module('petsitting').controller( 'SubmitController', [ '$scope', 'StorageService', 'FormMessages', 'AnimalTypes', '$routeParams', '$timeout', '$location',
  function ( $scope, StorageService, FormMessages, AnimalTypes, $routeParams, $timeout, $location ) {

  $scope.model = StorageService.getEmptyModel();
  $scope.now = new Date();
  $scope.animalTypes = AnimalTypes;
  $scope.locked = false;
  $scope.newItem = true;
  $scope.btnDisabled = false;

  var initMessages = function () {
    $scope.messages = new FormMessages({
      saved: false,
      dataInvalid: false,
      unknownError: false
    });
  };

  initMessages();

  var initData = function ( id ) {
    $scope.locked = true;
    $scope.newItem = false;
    StorageService.getSingle( id )
      .then( function ( data ) {
        $scope.model = data;
        $scope.locked = false;
      } )
      .catch( function ( data ) {
        $scope.messages.handleErrorData( data );
      } );
  };

  if ( $routeParams.id && $routeParams.id > 0 ) {
    initData( $routeParams.id );
  }

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
    $scope.btnDisabled = true;
    var successCallback = function ( data ) {
      $scope.messages.saved = true;
      $scope.messages.loadingOff();
      $scope.model = data;

      if ( !$routeParams.id || $routeParams.id < 1 ) {
        $timeout( function () {
          $location.path( '/edit/' + data.id );
        }, 2000 );
      } else {
        $scope.btnDisabled = false;
      }
    };

    var errorCallback = function ( data ) {
      $scope.messages.handleErrorData( data );
      $scope.messages.loadingOff();
      $scope.btnDisabled = false;
    };

    initMessages();

    if ( $scope.newItem ) {
      StorageService.persist( $scope.model )
        .then( successCallback, errorCallback );
    } else {
      StorageService.update( $scope.model.id, $scope.model )
        .then( successCallback, errorCallback );
    }
  };

} ] );