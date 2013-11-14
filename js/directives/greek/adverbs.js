app.directive('adverbs', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/adverbs.html',
    link: function() {

    }
  };
});