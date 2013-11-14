var app = angular.module('app', []);

function LanguageStudyController($scope) {
  $scope.showFirstLanguage = false;
  $scope.booksInGreek = [];

  var totalVersesInNewTestament = 7956;

  var getBookInEnglish = function(uri) {
    $.getJSON('data/leb/json/' + uri, function(data) {
      var book = _.findWhere(Bible.books, { 'abbreviations': [data.abbreviation] });
      book.leb = data.passages;
      if(book.name === $scope.currentBook) {
        $scope.verseInFirstLanguage = book.leb ? book.leb[$scope.currentPassage] : '';
        if($scope.verseInFirstLanguage) {
          $scope.verseInFirstLanguage = $scope.verseInFirstLanguage.replace(/<.*>/,"");  
        }
        $scope.$apply('currentPassage');
        $scope.$apply('verseInFirstLanguage');
      }
    });
  };
  var loadEnglishBook = _.rateLimit(getBookInEnglish,500);

  var getBookInGreek = function(uri) {
    $.getJSON('data/sblgnt/json/' + uri, function(data) {
      var book = _.findWhere(Bible.books, { 'abbreviations': [data.abbreviation] });
      book.sblgnt = data.passages;

      $scope.booksInGreek.push(book);
      if($scope.booksInGreek.length === 1) {
        $scope.showNextPassage();
      }
    });
    getBookInEnglish(uri);
  };
  var loadGreekBook = _.rateLimit(getBookInGreek,1000);

  $.getJSON('data/sblgnt/json/index.json', function(books) {
    shuffleArray(books);
    books.forEach(function(uri,index) {
      if(index === 0) {
        getBookInGreek(uri);
      } else {
        loadGreekBook(uri);  
      }
    });
  });

  $scope.triggerKeyupEvent = function(event) {
    if(!_.contains([13,32,39,40,75],event.which)) return;
    $scope.triggerTraversal();
  };

  $scope.triggerTraversal = function() {
    if(!$scope.showFirstLanguage) {
      $scope.showFirstLanguage = true;
    } else {
      $scope.showFirstLanguage = false;
      $scope.showNextPassage();
    }
  };

  function randomlySelectBookAndPassage() {
    var book;
    var reference,references;
    var randomNewTestamentBook;
    while(1) {
      book = Bible.books[_.random(39,65)];
      if(!book.sblgnt) continue;

      // Someone who knows statistics and probability, please improve this
      if((Math.random() - (1/27)) > (book.totalPassages / totalVersesInNewTestament)) {
        continue;
      }
      references = Object.keys(book.sblgnt);
      reference = references[_.random(references.length)];
      if(typeof book.sblgnt[reference] === 'undefined' || book.sblgnt[reference].split(' ').length > 10) continue; // Let's avoid loong verses for now
      return {
        book: book,
        reference: reference
      };
    }
  }

  $scope.showNextPassage = function() {
    var randomBookAndPassage = randomlySelectBookAndPassage();
    $scope.currentBook = randomBookAndPassage.book.name; 
    $scope.currentPassage = randomBookAndPassage.reference;
    $scope.verseInFirstLanguage = randomBookAndPassage.book.leb ? randomBookAndPassage.book.leb[randomBookAndPassage.reference] : '';
    if($scope.verseInFirstLanguage) {
      $scope.verseInFirstLanguage = $scope.verseInFirstLanguage.replace(/<.*>/,"");  
    }
    $scope.verseInSecondLanguage = randomBookAndPassage.book.sblgnt[randomBookAndPassage.reference];
    setTimeout(function() {
      $scope.$apply('verseInSecondLanguage');
    },10);
  };
}

// http://stackoverflow.com/a/15887417/176758
app.directive("ngTap", function() {
  return function($scope, $element, $attributes) {
    var tapped;
    tapped = false;
    $element.bind("click", function() {
      if (!tapped) {
        return $scope.$apply($attributes.ngTap);
      }
    });
    $element.bind("touchstart", function(event) {
      return tapped = true;
    });
    $element.bind("touchmove", function(event) {
      tapped = false;
      return event.stopImmediatePropagation();
    });
    return $element.bind("touchend", function() {
      if (tapped) {
        return $scope.$apply($attributes.ngTap);
      }
    });
  };
});

/**
 * http://stackoverflow.com/a/12646864/176758
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

_.rateLimit = function(func, rate, async) {
  var queue = [];
  var timeOutRef = false;
  var currentlyEmptyingQueue = false;
  
  var emptyQueue = function() {
    if (queue.length) {
      currentlyEmptyingQueue = true;
      _.delay(function() {
        if (async) {
          _.defer(function() { queue.shift().call(); });
        } else {
          queue.shift().call();
        }
        emptyQueue();
      }, rate);
    } else {
      currentlyEmptyingQueue = false;
    }
  };
  
  return function() {
    var args = _.map(arguments, function(e) { return e; }); // get arguments into an array
    queue.push( _.bind.apply(this, [func, this].concat(args)) ); // call apply so that we can pass in arguments as parameters as opposed to an array
    if (!currentlyEmptyingQueue) { emptyQueue(); }
  };
};

var Bible = {
  books: [
    {
      "name": "Genesis",
      "totalChapters": 50
    },
    {
      "name": "Exodus",
      "totalChapters": 40
    },
    {
      "name": "Leviticus",
      "totalChapters": 27
    },
    {
      "name": "Numbers",
      "totalChapters": 36
    },
    {
      "name": "Deuteronomy",
      "totalChapters": 34
    },
    {
      "name": "Joshua",
      "totalChapters": 24
    },
    {
      "name": "Judges",
      "totalChapters": 21
    },
    {
      "name": "Ruth",
      "totalChapters": 4
    },
    {
      "name": "1 Samuel",
      "totalChapters": 31
    },
    {
      "name": "2 Samuel",
      "totalChapters": 24
    },
    {
      "name": "1 Kings",
      "totalChapters": 22
    },
    {
      "name": "2 Kings",
      "totalChapters": 25
    },
    {
      "name": "1 Chronicles",
      "totalChapters": 29
    },
    {
      "name": "2 Chronicles",
      "totalChapters": 36
    },
    {
      "name": "Ezra",
      "totalChapters": 10
    },
    {
      "name": "Nehemiah",
      "totalChapters": 13
    },
    {
      "name": "Esther",
      "totalChapters": 10
    },
    {
      "name": "Job",
      "totalChapters": 42
    },
    {
      "name": "Psalms",
      "totalChapters": 150
    },
    {
      "name": "Proverbs",
      "totalChapters": 31
    },
    {
      "name": "Ecclesiastes",
      "totalChapters": 12
    },
    {
      "name": "Song of Solomon",
      "totalChapters": 8
    },
    {
      "name": "Isaiah",
      "totalChapters": 66
    },
    {
      "name": "Jeremiah",
      "totalChapters": 52
    },
    {
      "name": "Lamentations",
      "totalChapters": 5
    },
    {
      "name": "Ezekiel",
      "totalChapters": 48
    },
    {
      "name": "Daniel",
      "totalChapters": 12
    },
    {
      "name": "Hosea",
      "totalChapters": 14
    },
    {
      "name": "Joel",
      "totalChapters": 3
    },
    {
      "name": "Amos",
      "totalChapters": 9
    },
    {
      "name": "Obadiah",
      "totalChapters": 1
    },
    {
      "name": "Jonah",
      "totalChapters": 4
    },
    {
      "name": "Micah",
      "totalChapters": 7
    },
    {
      "name": "Nahum",
      "totalChapters": 3
    },
    {
      "name": "Habakkuk",
      "totalChapters": 3
    },
    {
      "name": "Zephaniah",
      "totalChapters": 3
    },
    {
      "name": "Haggai",
      "totalChapters": 2
    },
    {
      "name": "Zechariah",
      "totalChapters": 14
    },
    {
      "name": "Malachi",
      "totalChapters": 4
    },
    {
      "name": "Matthew",
      "totalChapters": 28,
      "abbreviations": [
        "Mt"
      ]
    },
    {
      "name": "Mark",
      "totalChapters": 16,
      "abbreviations": [
        "Mk"
      ]
    },
    {
      "name": "Luke",
      "totalChapters": 24,
      "abbreviations": [
        "Lk"
      ]
    },
    {
      "name": "John",
      "totalChapters": 21,
      "abbreviations": [
        "Jn"
      ]
    },
    {
      "name": "Acts",
      "totalChapters": 28,
      "abbreviations": [
        "Ac"
      ]
    },
    {
      "name": "Romans",
      "totalChapters": 16,
      "abbreviations": [
        "Ro"
      ]
    },
    {
      "name": "1 Corinthians",
      "totalPassages": 437,
      "totalChapters": 16,
      "abbreviations": [
        "1Co"
      ]
    },
    {
      "name": "2 Corinthians",
      "totalChapters": 13,
      "abbreviations": [
        "2Co"
      ]
    },
    {
      "name": "Galatians",
      "totalChapters": 6,
      "abbreviations": [
        "Ga"
      ]
    },
    {
      "name": "Ephesians",
      "totalChapters": 6,
      "abbreviations": [
        "Eph"
      ]
    },
    {
      "name": "Philippians",
      "totalChapters": 4,
      "abbreviations": [
        "Php"
      ]
    },
    {
      "name": "Colossians",
      "totalChapters": 4,
      "abbreviations": [
        "Col"
      ]
    },
    {
      "name": "1 Thessalonians",
      "totalChapters": 5,
      "abbreviations": [
        "1Th"
      ]
    },
    {
      "name": "2 Thessalonians",
      "totalChapters": 3,
      "abbreviations": [
        "2Th"
      ]
    },
    {
      "name": "1 Timothy",
      "totalChapters": 6,
      "abbreviations": [
        "1Ti"
      ]
    },
    {
      "name": "2 Timothy",
      "totalChapters": 4,
      "abbreviations": [
        "2Ti"
      ]
    },
    {
      "name": "Titus",
      "totalChapters": 3,
      "abbreviations": [
        "Tit"
      ]
    },
    {
      "name": "Philemon",
      "totalChapters": 1,
      "abbreviations": [
        "Phm"
      ]
    },
    {
      "name": "Hebrews",
      "totalChapters": 13,
      "abbreviations": [
        "Heb"
      ]
    },
    {
      "name": "James",
      "totalChapters": 5,
      "abbreviations": [
        "Jas"
      ]
    },
    {
      "name": "1 Peter",
      "totalChapters": 5,
      "abbreviations": [
        "1Pe"
      ]
    },
    {
      "name": "2 Peter",
      "totalChapters": 3,
      "abbreviations": [
        "2Pe"
      ]
    },
    {
      "name": "1 John",
      "totalChapters": 5,
      "abbreviations": [
        "1Jn"
      ]
    },
    {
      "name": "2 John",
      "totalChapters": 1,
      "abbreviations": [
        "2Jn"
      ]
    },
    {
      "name": "3 John",
      "totalChapters": 1,
      "abbreviations": [
        "3Jn"
      ]
    },
    {
      "name": "Jude",
      "totalChapters": 1,
      "abbreviations": [
        "Jud"
      ]
    },
    {
      "name": "Revelation",
      "totalChapters": 22,
      "abbreviations": [
        "Re"
      ]
    }
  ]
};