angular.module('petsittingFilters').filter('animalType', ['AnimalTypes', function ( AnimalTypes ) {

  return function ( raw ) {
    if ( !AnimalTypes[ raw ] ) {
      return 'Unbekannt';
    }

    return AnimalTypes[ raw ];
  };

}]);