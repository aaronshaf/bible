app.directive('articles', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/articles.html',
    link: function() {

    }
  };
});