app.directive('relativePronouns', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/relative-pronouns.html',
    link: function($scope) {

    }
  };
});