onRecentEvergreenBrowser = (function () {
  try {
    return eval('(function () { const foobarbaz = 12; return typeof foobarbaz === "number"; }())');
  } catch (e) {
    return false;
  }
}());

app = angular.module('app', []);

cache = {}
setCache = function(key,value) {
  if(Object.keys(cache).length > 250) {
    delete cache[Object.keys(cache)[0]];
    delete cache[Object.keys(cache)[0]];
  }
  cache[key] = value;
}
getCache = function(key) {
  return typeof cache[key] === 'undefined' ? false : cache[key];
}

parsing = [
  {
    key: 'person',
    label: 'Person',
    order: 0,
    options: ['1st person','2nd person','3rd person']
  },
  {
    key: 'tense',
    label: 'Tense',
    order: 1,
    options: ['Present','Imperfect','Aorist','Future','Perfect','Pluperfect']
  },
  {
    key: 'voice',
    label: 'Voice',
    order: 2,
    options: ['Active','Middle','Passive']
  },
  {
    key: 'mood',
    label: 'Mood',
    order: 3,
    options: ['Indicative','Subjunctive','Optative','Imperative','Infinitive','Participle']
  },
  {
    key: 'case',
    label: 'Case',
    order: 4,
    options: ['Nominative','Genitive','Dative','Accusative','Vocative']
  },
  {
    key: 'gender',
    label: 'Gender',
    order: 5,
    options: ['Masculine','Feminine','Neuter'],
  },
  {
    key: 'number',
    label: 'Number',
    order: 6,
    options: ['Singular','Plural']
  },
  {
    key: 'degree',
    label: 'Degree',
    order: 7,
    options: ['Comparative','Superlative'] // Default is 'Positive'
  }
];

function StudyGreek($scope) {
  if(!onRecentEvergreenBrowser) {
    $scope.begUserToUpgradeTheirBrowser = true;
    return;
  }

  $scope.secondLanguage = undefined;
  $scope.showSettings = false;
  var bcv = new bcv_parser;

  $scope.setReference = function(reference) {
    try {
      var parsedReferenceQuery = bcv.parse(reference).parsed_entities();
      $scope.book = parsedReferenceQuery[0].entities[0].start.b;
      $scope.chapter = parsedReferenceQuery[0].entities[0].start.c;
      $scope.verse = parsedReferenceQuery[0].entities[0].start.v;
      fetchVerse($scope.book,$scope.chapter,$scope.verse);
      $scope.selectedWord = undefined;
      $scope.wordData = undefined;
      $scope.sticky = false;
    } catch(e) {}
  };

  function fetchVerse(book,chapter,verse) {
    var ntBookOrder = bcv_parser.prototype.translations.default.order[book] - 39;
    var file = 'data/morphs/json/' + pad(ntBookOrder,2) + '/' + pad(chapter,2) + '/' + pad(verse + 1,2) + '.json';
    var data;
    if(data = getCache(file)) {
      $scope.secondLanguage = importVerse(data);
    } else {
      $.getJSON(file,function(data) {
        setCache(file, data);
        $scope.secondLanguage = importVerse(data);
        $scope.$apply('secondLanguage');
      });      
    }
  };
  
  $scope.$watch('referenceQuery', function(newValue) {
    if(newValue) {
      $scope.setReference(newValue);
    }
  });
  $scope.setReference('John 3:16');
  
  $scope.sticky = false;

  $scope.getWordData = function(word) {
    var firstCharacter = word.versions.lemma.substr(0,1);
    var lemmaCodes = convertToCharCodes(word.versions.lemma);
    var file = 'data/words/json/' + lemmaCodes.split('-')[0] + '/' + lemmaCodes + '.json';
    var data;
    if(data = getCache(file)) {
      $scope.wordData = data;
    } else {
      $.getJSON(file,function(data) {
        setCache(file, data);
        if($scope.selectedWord !== word) return;
        $scope.wordData = data;
        $scope.$apply('wordData');
      });      
    }
  };

  $scope.selectWord = function(word) {
    if($scope.sticky) return;
    // var word = $scope.secondLanguage[index];
    $scope.selectedWord = word;
    $scope.getWordData(word);
  };

  $scope.stickySelectWord = function(event,word) {
    if($scope.sticky && $scope.selectedWord === word) {
      $scope.sticky = false;
      $(event.target).blur();
      return;
    }
    $scope.selectedWord = word;
    $scope.getWordData(word);
    $scope.sticky = true;
  };

  $scope.handleKeypress = function(event,word) {
    if(event.which === 13) {
      $scope.stickySelectWord(event,word);
      return false;
    }
  };

  $scope.handleKeydown = function(event,word) {
    var index;
    if(event.which === 37) {
      index = $scope.secondLanguage.indexOf(word);
      if(index > 0) {
        $scope.stickySelectWord(event,$scope.secondLanguage[index - 1]);  
        $(event.target).parent('span').prev('span').find('span').focus();
      }
    } else if(event.which === 39) {
      index = $scope.secondLanguage.indexOf(word);
      if(index + 1 < $scope.secondLanguage.length) {
        $scope.stickySelectWord(event,$scope.secondLanguage[index + 1]);
        $(event.target).parent('span').next('span').find('span').focus();
      }
    }
    window.test = event
  };

  $scope.handleReferenceQueryKeydown = function(event) {
    var increment, referenceQuery;
    if(event.which === 38) {
      increment = -1;
    } else if(event.which === 40) {
      increment = 1;
    } else {
      return;
    }
    if(!$scope.referenceQuery) {
      referenceQuery = 'John 3:16';
    } else {
      referenceQuery = $scope.referenceQuery;
    }
    try {
      var parsedReferenceQuery = bcv.parse(referenceQuery).parsed_entities();
      $scope.book = parsedReferenceQuery[0].entities[0].start.b;
      $scope.chapter = parsedReferenceQuery[0].entities[0].start.c;
      $scope.verse = parsedReferenceQuery[0].entities[0].start.v + increment;
      fetchVerse($scope.book,$scope.chapter,$scope.verse);
      $scope.selectedWord = undefined;
      $scope.wordData = undefined;
      $scope.sticky = false;
      $scope.secondLanguage = undefined;
      $scope.referenceQuery = $scope.book + ' ' + $scope.chapter + ':' + $scope.verse;
      return false;
    } catch(e) {}
  };

  $scope.parsing = parsing;
}

function importVerse(words) {
  words.forEach(function(data,index) {
    word = {versions: {},grammar: {}};

    word.partOfSpeechCode = data[0];
    word.parsingCode = data[1];

    word.versions.text = data[2];
    word.versions.with_punctuation_stripped = data[3];
    word.versions.normalized = data[4];
    word.versions.lemma = data[5];

    word.partOfSpeech = partOfSpeech(data[0]);

    word.grammar['person'] = person(word.parsingCode.substr(0,1));
    word.grammar['tense'] = tense(word.parsingCode.substr(1,1));
    word.grammar['voice'] = voice(word.parsingCode.substr(2,1));
    word.grammar['mood'] = mood(word.parsingCode.substr(3,1));
    word.grammar['case'] = _case(word.parsingCode.substr(4,1));
    word.grammar['number'] = number(word.parsingCode.substr(5,1));
    word.grammar['gender'] = gender(word.parsingCode.substr(6,1));
    word.grammar['degree'] = degree(word.parsingCode.substr(7,1));

    words[index] = word;
  });
  return words;
}

function partOfSpeech(input) {
  switch(input) {
    case 'N-':
      return 'Noun';
    case 'V-':
      return 'Verb';
    case 'A-':
      return 'Adjective';
    case 'C-':
      return 'Conjunction';
    case 'RA':
      return 'Article';
    case 'D-':
      return 'Adverb';
    case 'P-':
      return 'Preposition';
    // case 'RP':
    //   return 'Interrogative Pronoun';
    // case 'RR':
      // return 'Relative Pronoun';
    case 'RP':
      return 'Relative Pronoun';
    case 'RI':
      return 'Indefinite Pronoun';
    // case 'X-':
    //   return 'Conditional Particle';
  }
  return undefined;
}

function number(input) {
  switch(input) {
    case 'S':
      return 'Singular';
    case 'P':
      return 'Plural';
  }
  return undefined;
}

function person(input) {
  switch(input) {
    case '1':
      return '1st person';
    case '2':
      return '2nd person';
    case '3':
      return '3rd person';
  }
  return undefined;
}

function gender(input) {
  switch(input) {
    case 'M':
      return 'Masculine';
    case 'F':
      return 'Feminine';
    case 'N':
      return 'Neuter';
  }
  return undefined;
}

function tense(input) {
  switch(input) {
    case 'P':
      return 'Present';
    case 'I':
      return 'Imperfect';
    case 'A':
      return 'Aorist';
    case 'F':
      return 'Future';
    case 'X':
      return 'Perfect';
    case 'Y':
      return 'Pluperfect';
  }
  return undefined;
}

function mood(input) {
  switch(input) {
    case 'I':
      return 'Indicative';
    case 'S':
      return 'Subjunctive';
    case 'O':
      return 'Optative';
    case 'D':
      return 'Imperative';
    case 'N':
      return 'Infinitive';
    case 'P':
      return 'Participle';
  }
  return undefined;
}

// 'case' is a keyword in JavaScript
function _case(input) {
  switch(input) {
    case 'N':
      return 'Nominative';
    case 'G':
      return 'Genitive';
    case 'D':
      return 'Dative';
    case 'A':
      return 'Accusative';
    case 'V':
      return 'Vocative';
  }
  return undefined;
}

function voice(input) {
  switch(input) {
    case 'A':
      return 'Active';
    case 'M':
      return 'Middle';
    case 'P':
      return 'Passive';
  }
  return undefined;
}

function degree(input) {
  switch(input) {
    // case '-':
    //   return 'Positive';
    case 'C':
      return 'Comparative';
    case 'S':
      return 'Superlative';
  }
  return undefined;
}

// WIP
function complexityOfWord(word) {
  var totalComplexity = 0;
  var maximumComplexity = 0;

  // frequency

  // partOfSpeech

  // number

  // person

  // gender

  // tense

  // case

  // voice

  // mood

  // degree
}

// WIP
function complexityOfCollection(words) {
  // lower quartile
  // median
  // upper quartile
  // max
}

// http://stackoverflow.com/a/10073764/176758
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//
function convertToCharCodes(str) {
  var codes = [];
  Array.prototype.forEach.call(str,function(x) {
    codes.push(x.charCodeAt(0));
  });
  return codes.join('-');
}