angular.module('petsitting').directive( 'loadingAnimation', function () {

  return {
    restrict: 'E',
    templateUrl: 'directive/loading-animation.html',
    link: function ( $scope, $element ) {
      $element = jQuery( $element );
      var svg = $element.find('.paw-image');
      var toes = svg.find('.toe').get().reverse();
      for ( var i = 0; i < toes.length; i++ ) {
        ( function ( i ) {
          setTimeout( function () {
            setInterval( function () {
              var toe = jQuery( toes[i] );
              toe.attr( 'class', [toe.attr('class'), 'light'].join(' ').trim() );
              setTimeout( function () {
                toe.attr( 'class', toe.attr('class').replace( 'light', '' ).trim() );
              }, 100 );
            }, (toes.length) * 200 );
          }, 200 * (i+1) );
        } )( i );
      }
    }
  };

} );