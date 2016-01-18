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
   * Returns an empty model
   * @returns     object containing all properties with emptyish values
   */
  var getEmptyModel = function () {
    return angular.copy( emptyModel );
  };

  /**
   * Returns a promise resolving with all userdata stored in the petsitting.userdata table
   * @returns     Promise resolving with all userdata
   */
  var getAll = function () {
    var defer = $q.defer();

    $http( {
      url: "/api/index.php",
      method: "GET"
    } )
        .success( function ( response ) {
          defer.resolve( response );
        } )
        .error( function( response ){
          defer.reject( response );
        } );

    //$http.get( 'test-data.json' )
    //  .success( function ( response ) {
    //    defer.resolve( response );
    //  } )
    //  .error( function ( response ) {
    //    defer.reject( response );
    //  } );
    return defer.promise;
  };

  /**
   * Returns a promise resolving with the userdata of a user
   * @param       id    the primary key to return the userdata for
   * @returns     Promise resolving with userdata of the given id
   */
  var getSingle = function (id) {
    var defer = $q.defer();

    $http( {
      url: "/api/index.php",
      method: "GET",
      params: {
        id: id
      }
    } )
        .success( function ( response ) {
          defer.resolve( response );
        } )
        .error( function( response ){
          defer.reject( response );
        } );

    return defer.promise;
  };

  /**
   * Sends an update request with the provided data to the service.
   * @param     data    The data model to update
   * @returns           Promise representing the update process
   */
  var update = function ( id, data ) {
    var defer = $q.defer();
    $http({
      url:"/api/index.php",
      method:"PUT",
      data: data,
      params:{
        id: id
      }
    })
        .success( function( response ){
          defer.resolve( response );
        } )
        .error( function( response ){
          defer.reject( response );
        } );


    return defer.promise;
  };

  /**
   * Sends a persist request with the provided data to the service.
   * @param     data    The data model to persist
   * @returns           Promise representing the persisting process
   */
  var persist = function ( data ) {
    var defer = $q.defer();

    $http({
      url:"/api/index.php",
      method:"POST",
      data: data
    })
        .success( function( response ){
          defer.resolve( response );
        } )
        .error( function( response ){
          defer.reject( response );
        } );

    return defer.promise;
  };

  /**
   * Sends a delete request for the provided id to the service.
   * @param     id      the primary key of the userdata that is going the be removed
   * @returns           Promise representing the delete process
   */
  var remove = function ( id ) {
    var defer = $q.defer();

    $http({
      url:"/api/index.php",
      method: "DELETE",
      params: {
        id: id
      }
    })
        .success(function (response) {
          defer.resolve(response);
        })
        .error(function (response) {
          defer.reject(response);
        });

    return defer.promise;
  };

  return {
    getAll: getAll,
    persist: persist,
    getEmptyModel: getEmptyModel
  };

} ] );