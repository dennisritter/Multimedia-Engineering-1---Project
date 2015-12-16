angular.module('petsitting').controller('SlideShowController', ['$scope', '$interval', function($scope, $interval){

  $scope.images = [
    {path:"/img/slideshow-dog.jpg"},
    {path:"/img/sliedshow-guineapig.jpg"},
    {path:"/img/slideshow-cat.jpg"},
    {path:"/img/slideshow-rabbit.jpg"},
    {path:"/img/slideshow-dog2.jpg"}
  ];

  $scope.image = $scope.images[0];

  var counter = 0;
  $interval(function(){
    $scope.image = $scope.images[counter % ( $scope.images.length - 1 )];
    counter++;
  }, 1000);

}]);

