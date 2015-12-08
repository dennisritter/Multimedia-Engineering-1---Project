angular.module('petsitting').service( 'StorageService', [ '$http', '$q', function ( $http, $q ) {

  /**
   * Returns a promise resolving with test data from test-data.json
   * @returns     Promise resolving with test data
   */
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