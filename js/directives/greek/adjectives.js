app.directive('adjectives', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/adjectives.html',
    link: function() {

    }
  };
});
