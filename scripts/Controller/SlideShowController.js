angular.module('petsitting').controller('SlideShowController', ['$scope', '$interval', function ($scope, $interval) {

  $scope.images = [
    {path:"/img/slideshow-dog.jpg"},
    {path:"/img/sliedshow-guineapig.jpg"},
    {path:"/img/slideshow-cat.jpg"},
    {path:"/img/slideshow-rabbit.jpg"},
    {path:"/img/slideshow-dog2.jpg"}
  ];

  $scope.counter = 0;
  $interval(function(){
    $scope.counter++;
    $scope.counter = $scope.counter % $scope.images.length;
  }, 5000);

}]);