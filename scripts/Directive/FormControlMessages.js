angular.module('petsitting').directive('formControlMessages', function () {

  return {
    restrict: 'E',
    templateUrl: 'directive/form-control-messages.html',
    scope: {
      input: '='
    },
    transclude: true
  }

});
