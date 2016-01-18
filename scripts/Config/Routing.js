angular.module( 'petsitting' ).config( [ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider ) {

  $routeProvider
    .when( '/', {
      templateUrl: 'layout/front-page.html',
      activeTab: 'home'
    } )
    .when( '/submit', {
      templateUrl: 'layout/submit.html',
      activeTab: 'submit'
    } )
    .when( '/edit/:id', {
      templateUrl: 'layout/submit.html',
      activeTab: 'submit'
    } )
    .when( '/table', {
      templateUrl: 'layout/table.html',
      activeTab: 'table'
    } )
    .otherwise( '/' );

  $locationProvider.html5Mode( true );

} ] );