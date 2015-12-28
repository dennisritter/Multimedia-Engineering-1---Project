angular.module('petsitting').service( 'StorageService', [ '$http', '$q', '$timeout', function ( $http, $q, $timeout ) {

  var emptyModel = {
    "firstName": "",
    "lastName": "",
    "city": "",
    "zipCode": "",
    "street": "",
    "dateStart": "",
    "dateEnd": "",
    "animalType": "",
    "animalBreed": "",
    "animalName": "",
    "animalAge": "",
    "description": "",
    "email": "",
    "phone": ""
  };

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

  /**
   * Returns an empty model
   * @returns     object containing all properties with emptyish values
   */
  var getEmptyModel = function () {
    return angular.copy( emptyModel );
  };

  /**
   * Sends a persist request with the provided data to the service.
   * @param     data    The data model to persist
   * @returns           Promise representing the persisting process
   */
  var persist = function ( data ) {
    var defer = $q.defer();

    $timeout( function () {
      defer.resolve( data );
    }, 4000 );

    return defer.promise;
  };

  return {
    getAll: getAll,
    persist: persist,
    getEmptyModel: getEmptyModel
  };

} ] );