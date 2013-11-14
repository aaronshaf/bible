app.directive('indefinitePronouns', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/indefinite-pronouns.html',
    link: function($scope) {

    }
  };
});