angular.module('petsitting').service( 'StorageService', [ '$http', '$q', function ( $http, $q ) {

  var getAll = function () {
    var defer = $q.defer();

    $http.get( '/test-data.json' )
      .success( function ( response ) {
        defer.resolve( response );
      } )
      .error( function ( response ) {
        defer.reject( response );
      } );

    return defer.promise;
  };

  return {
    getAll: getAll
  };

} ] );