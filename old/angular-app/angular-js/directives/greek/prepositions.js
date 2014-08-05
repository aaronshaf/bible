app.directive('prepositions', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/prepositions.html',
    link: function() {

    }
  };
});