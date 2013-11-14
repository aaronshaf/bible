app.directive('verbs', function() {
  return {
    restrict: 'E',
    scope: {
      selectedWord: '=selectedWord',
      wordData: '=wordData'
    },
    templateUrl: 'templates/greek/verbs.html',
    link: function($scope) {
      var voices = [
        {
          "label": "Active",
          "code": "A"
        },
        {
          "label": "Middle",
          "code": "M"
        },
        {
          "label": "Passive",
          "code": "P"
        }
      ];

      var moods = [
        {
          "label": "Indicative",
          "code": "I"
        },
        {
          "label": "Subjunctive",
          "code": "S"
        },
        {
          "label": "Optative",
          "code": "O"
        },
        {
          "label": "Imperative",
          "code": "D"
        },
        {
          "label": "Infinitive",
          "code": "N"
        }
        // Treat participles differently, since they have no person
        // {
        //   "label": "Participle",
        //   "code": "P"
        // }
      ];

      var persons = [
        {
          "label": "1st person",
          "code": "1"
        },
        {
          "label": "2nd person",
          "code": "2"
        },
        {
          "label": "3rd person",
          "code": "3"
        }
      ];

      var numbers = [
        {
          "label": "singular",
          "code": "S"
        },
        {
          "label": "plural",
          "code": "P"
        }
      ];

      var genders = [
        {
          "label": "Masculine",
          "code": "M"
        },
        {
          "label": "Feminine",
          "code": "F"
        },
        {
          "label": "Neuter",
          "code": "N"
        }
      ];

      var tenses = [
        {
          "label": "Present",
          "code": "P"
        },
        {
          "label": "Imperfect",
          "code": "I"
        },
        {
          "label": "Future",
          "code": "F"
        },
        {
          "label": "Aorist",
          "code": "A"
        },
        {
          "label": "Perfect",
          "code": "X"
        },
        {
          "label": "Pluperfect",
          "code": "Y"
        }
      ];

      var cases = [
        {
          "label": "Nominative",
          "code": "N"
        },
        {
          "label": "Genitive",
          "code": "G"
        },
        {
          "label": "Dative",
          "code": "D"
        },
        {
          "label": "Accusative",
          "case": "A"
        },
        {
          "label": "Vocative",
          "case": "V"
        }
      ];

      function updateVerbCharts() {
        var verbCharts = {};
        if(!$scope.wordData) { return; }

        moods.forEach(function(mood) {
          voices.forEach(function(voice) {
            numbers.forEach(function(number) {
              persons.forEach(function(person) {
                tenses.forEach(function(tense) {
                  if(!$scope.wordData) return;
                  var code = 'V-' + person.code + tense.code + voice.code + mood.code + '-' + number.code + '--';
                  if(typeof $scope.wordData.forms[code] !== 'undefined') {
                    verbCharts[mood.code + voice.code + number.code] = true;
                  }
                });
              });
            });
          });
        });
        $scope.verbCharts = verbCharts;
      }
      $scope.$watch('wordData', updateVerbCharts);

      function updateParticipleCharts() {
        var participleCharts = {};
        if(!$scope.wordData) { return; }

        tenses.forEach(function(tense) {
          voices.forEach(function(voice) {
            numbers.forEach(function(number) {
              cases.forEach(function(_case) {
                genders.forEach(function(gender) {
                  if(!$scope.wordData) return;
                  var code = 'V--' + tense.code + voice.code + 'P' + _case.code + number.code + gender.code + '-';
                  if(typeof $scope.wordData.forms[code] !== 'undefined') {
                    participleCharts[tense.code + voice.code + number.code] = true;
                  }
                });
              });
            });
          });
        });
        $scope.participleCharts = participleCharts;  
      }
      $scope.$watch('wordData', updateParticipleCharts);

      $scope.showVerbMorph = function(word,form) {
        if(typeof word.forms[form] === 'undefined') return;
        $scope.modal = {
          data: word.forms[form]
        };
        $scope.showVerbMorphModal = true;
      };

      $scope.hideVerbMorph = function() {
        $scope.showVerbMorphModal = false;
      };

      $scope.voices = voices;
      $scope.tenses = tenses;
      $scope.cases = cases;
      $scope.numbers = numbers;
      $scope.genders = genders;
      $scope.moods = moods;
      $scope.persons = persons;
    }
  };
});