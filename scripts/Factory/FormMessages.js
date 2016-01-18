angular.module('petsitting').factory('FormMessages', function () {
  return function ( messages ) {
    var $this = this;

    $this.loading = false;

    $this.reset = function () {
      angular.extend( $this, messages );
    };

    $this.extend = function ( newMessages ) {
      if ( typeof newMessages === 'string' ) {
        var object = {};
        object[ newMessages ] = true;
        angular.extend( $this, object );
        return;
      }
      angular.extend( $this, newMessages );
    };

    $this.loadingOn = function () {
      $this.loading = true;
    };

    $this.loadingOff = function () {
      $this.loading = false;
    };

    $this.handleErrorData = function ( data ) {
      if ( data.error ) {
        $this[ data.error ] = true;
      } else {
        $this.unknownError = true;
      }
    };

    $this.reset();
  };
} );