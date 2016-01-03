angular.module( 'petsittingFilters', [] );

angular.module( 'petsitting', [
  'ngMessages',
  'ngRoute',
  'uiGmapgoogle-maps',
  'ngAnimate',
  'petsittingFilters'
] );

angular.module( 'petsittingFilters' ).value( 'AnimalTypes', {
  dog: 'Hund',
  cat: 'Katze',
  mouse: 'Maus',
  bird: 'Vogel'
} );