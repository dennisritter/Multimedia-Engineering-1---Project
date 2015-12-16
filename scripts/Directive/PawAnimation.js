angular.module('petsitting').directive('pawAnimation', [ '$http', function ( $http ) {

  var img = '/img/pfote.svg';

  return {
    restrict: 'E',
    link: function ( $scope, $element ) {
      var loadImage = function () {
        $http.get( img )
          .success( function ( svg ) {
            jQuery(svg).appendTo( $element );
            //animate(svg);
          } )
      };

      var animate = function ( image ) { console.log( image );
        var elements = [];
        for ( var i = 0; i < 4; i++ ) {
          elements[i] = image.getElementById( 'toe'+i );
        }
        elements[ elements.length ] = image.getElementById( 'palm' );

        for ( var j = 0; j < elements.length; j++ ) {
          var el = elements[j];
          el.style.opacity = 0;

          ( function ( element, offset ) {
            setTimeout( function () {
              element.style.opacity = 1;
            }, ( offset + 1 ) * 100 );
          } )( el, j );
        }
      };

      loadImage();
    }
  }

}]);