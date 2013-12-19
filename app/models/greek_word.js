App.GreekWord = Ember.Object.extend({
  partOfSpeech: function() {
    return App.partsOfSpeech.findBy('code',this.get('partOfSpeechCode'));
  }.property('partOfSpeechCode'),

  persons: function() {
    var activeCode = this.get('morph').substr(0,1);
    return App.persons.map(function(person) {
      return {
        label: person.label,
        active: person.code === activeCode
      }
    });
  }.property('morph'),

  voices: function() {
    var activeCode = this.get('morph').substr(2,1);
    return App.voices.map(function(voice) {
      return {
        label: voice.label,
        active: voice.code === activeCode
      }
    });
  }.property('morph'),

  numbers: function() {
    var activeCode = this.get('morph').substr(5,1);
    return App.numbers.map(function(number) {
      return {
        label: number.label,
        active: number.code === activeCode
      }
    });
  }.property('morph'),

  genders: function() {
    var activeCode = this.get('morph').substr(6,1);
    return App.genders.map(function(gender) {
      return {
        label: gender.label,
        active: gender.code === activeCode
      }
    });
  }.property('morph'),

  degrees: function() {
    var activeCode = this.get('morph').substr(7,1);
    return App.degrees.map(function(degree) {
      return {
        label: degree.label,
        active: degree.code === activeCode
      }
    });
  }.property('morph'),

  tenses: function() {
    var activeCode = this.get('morph').substr(1,1);
    return App.tenses.map(function(tense) {
      return {
        label: tense.label,
        active: tense.code === activeCode
      }
    });
  }.property('morph'),

  moods: function() {
    var activeCode = this.get('morph').substr(3,1);
    return App.moods.map(function(mood) {
      return {
        label: mood.label,
        active: mood.code === activeCode
      }
    });
  }.property('morph'),

  cases: function() {
    var activeCode = this.get('morph').substr(4,1);
    return App.cases.map(function(_case) {
      return {
        label: _case.label,
        active: _case.code === activeCode
      }
    });
  }.property('morph'),

  verbCharts: function() {
    var charts = {};
    var morph = this.get('morph');
    var forms = this.get('forms');
    console.log('forms',forms)
    if(!morph || !forms) return;

    App.moods.forEach(function(mood) {
      App.voices.forEach(function(voice) {
        App.numbers.forEach(function(number) {
          App.persons.forEach(function(person) {
            App.tenses.forEach(function(tense) {
              var code = 'V-' + person.code + tense.code + voice.code + mood.code + '-' + number.code + '--';
              if(typeof forms[code] !== 'undefined') {
                charts[mood.code + voice.code + number.code] = true;
              }
            });
          });
        });
      });
    });

    charts = Object.keys(charts);
    console.log('charts',charts)

    return charts;
  }.property('forms','morph')
});

App.voices = [
  {label: 'Active', code: 'A'},
  {label: 'Middle', code: 'M'},
  {label: 'Passive', code: 'P'}    
];

App.partsOfSpeech = [
  {label: 'Noun', code: 'N-'},
  {label: 'Verb', code: 'V-'},
  {label: 'Adjective', code: 'A-'},
  {label: 'Conjunction', code: 'C-'},
  {label: 'Article', code: 'RA'},
  {label: 'Adverb', code: 'D-'},
  {label: 'Preposition', code: 'P-'},
  {label: 'Relative Pronoun', code: 'RP'},
  {label: 'Indefinite Pronoun', code: 'RI'}
];

App.numbers = [
  {label: 'Singular', code: 'S'},
  {label: 'Plural', code: 'P'}
];

App.persons = [
  {label: '1st person', code: '1'},
  {label: '2nd person', code: '2'},
  {label: '3rd person', code: '3'}
];

App.genders = [
  {label: 'Masculine', code: 'M'},
  {label: 'Feminine', code: 'F'},
  {label: 'Neuter', code: 'N'}
];

App.tenses = [
  {label: 'Present', code: 'P'},
  {label: 'Imperfect', code: 'I'},
  {label: 'Aorist', code: 'A'},
  {label: 'Future', code: 'F'},
  {label: 'Perfect', code: 'X'},
  {label: 'Pluperfect', code: 'Y'}
];

App.moods = [
  {label: 'Indicative', code: 'I'},
  {label: 'Subjunctive', code: 'S'},
  {label: 'Optative', code: 'O'},
  {label: 'Imperative', code: 'D'},
  {label: 'Infinitive', code: 'N'},
  {label: 'Participle', code: 'P'}
];

App.cases = [
  {label: 'Nominative', code: 'N'},
  {label: 'Genitive', code: 'G'},
  {label: 'Dative', code: 'D'},
  {label: 'Accusative', code: 'A'},
  {label: 'Vocative', code: 'V'}
];

App.voices = [
  {label: 'Active', code: 'A'},
  {label: 'Middle', code: 'M'},
  {label: 'Passive', code: 'P'}
];

App.degrees = [
  // {label: 'Positive', code: '-'},
  {label: 'Comparative', code: 'C'},
  {label: 'Superlative', code: 'S'}
];