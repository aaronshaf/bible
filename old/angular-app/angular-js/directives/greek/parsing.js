app.directive('parsing', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      parsing: '=parsing'
    },
    templateUrl: 'templates/greek/parsing.html',
    link: function() {

    }
  };
});