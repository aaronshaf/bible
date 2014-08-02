App.GreekWordRoute = Ember.Route.extend({
  model: function(params) {
    var API_HOST;
    if(window.location.host.indexOf('localhost') > -1) {
      API_HOST = 'http://localhost:8081/';
    } else {
      API_HOST = 'http://api.bible.theopedia.com/';
    }
    
    var word = this.modelFor('verse').get('words').findBy("position",params.position);
    return new Ember.RSVP.Promise(function(resolve,reject) {
      var firstCharacter = word.get('lemma').substr(0,1);

      Ember.$.getJSON(API_HOST + 'words/sblgnt/json/' + firstCharacter + '/' + word.get('lemma') + '.json').then(function(data) {
        word.setProperties(data);
        console.log(word);
        resolve(word);
      });
    });
  }
});

var parsingCategories = [
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
    key: 'number',
    label: 'Number',
    order: 5,
    options: ['Singular','Plural']
  },
  {
    key: 'gender',
    label: 'Gender',
    order: 6,
    options: ['Masculine','Feminine','Neuter'],
  },
  {
    key: 'degree',
    label: 'Degree',
    order: 7,
    options: ['Comparative','Superlative'] // Default is 'Positive'
  }
];

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