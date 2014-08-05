app.directive('settings', function() {
  return {
    restrict: 'E',
    scope: {
      settings: '=settings'
    },
    templateUrl: 'templates/settings.html',
    link: function() {
    }
  };
});