angular.module('petsitting').service( 'StorageService', [ '$http', '$q', function ( $http, $q ) {

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
    "animalAge": 0,
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

  return {
    getAll: getAll,
    getEmptyModel: getEmptyModel
  };

} ] );