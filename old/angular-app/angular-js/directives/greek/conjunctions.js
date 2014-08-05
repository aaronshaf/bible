app.directive('conjunctions', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/conjunctions.html',
    link: function($scope) {
      $scope.conjunctions = {
        'coordinating': ['ἀλλά','ἄρα','ἆρα','γάρ','δέ','διόπερ','εἴτε','ἤ','ἤτοι','καί','μήτε','οὐδέ','οὖν','οὔτε','τέ','τοίνυν'],
        'subordinating': ['ἐάν','εἰ','εἴπερ','ἐπάν','ἡνίκα','ἤπερ','ἵνα','ἱνατί','καθό','καθότι','καθώς','καθώσπερ','καίτοιγε','ὅπου','ὅπως','ὅταν','ὅτε','ὅτι','πρίν','πῶς','ὡσεί','ὥσπερ','ὡσπερεί','ὥστε','ἕως','']
      };

      // replaced καί with καὶ?
    }
  };
});