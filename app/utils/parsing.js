var Immutable = require('immutable')

module.exports = Immutable.fromJS({
  partOfSpeech: {
    label: 'Part of speech',
    options: [
      {label: 'Noun', code: 'N-'},
      {label: 'Verb', code: 'V-'},
      {label: 'Adjective', code: 'A-'},
      {label: 'Conjunction', code: 'C-'},
      {label: 'Article', code: 'RA'},
      {label: 'Adverb', code: 'D-'},
      {label: 'Preposition', code: 'P-'},
      {label: 'Relative Pronoun', code: 'RP'},
      {label: 'Demonstrative Pronoun', code: 'RD'},
      {label: 'Indefinite Dronoun', code: 'RI'}
    ]
  },

  person: {
    label: 'Person',
    options: [
      {label: '1st person', code: '1'},
      {label: '2nd person', code: '2'},
      {label: '3rd person', code: '3'}
    ]
  },

  tense: {
    label: 'Tense',
    options: [
      {label: 'Present', code: 'P'},
      {label: 'Imperfect', code: 'I'},
      {label: 'Aorist', code: 'A'},
      {label: 'Future', code: 'F'},
      {label: 'Perfect', code: 'X'},
      {label: 'Pluperfect', code: 'Y'}
    ]
  },

  voice: {
    label: 'Voice',
    options: [
      {label: 'Active', code: 'A'},
      {label: 'Middle', code: 'M'},
      {label: 'Passive', code: 'P'}
    ]
  },

  mood: {
    label: 'Mood',
    options: [
      {label: 'Indicative', code: 'I'},
      {label: 'Subjunctive', code: 'S'},
      {label: 'Optative', code: 'O'},
      {label: 'Imperative', code: 'D'},
      {label: 'Infinitive', code: 'N'},
      {label: 'Participle', code: 'P'}
    ]
  },

  case: {
    label: 'Case',
    options: [
      {label: 'Nominative', code: 'N'},
      {label: 'Genitive', code: 'G'},
      {label: 'Dative', code: 'D'},
      {label: 'Accusative', code: 'A'},
      {label: 'Vocative', code: 'V'}
    ]
  },

  number: {
    label: 'Number',
    options: [
      {label: 'Singular', code: 'S'},
      {label: 'Plural', code: 'P'}
    ]
  },

  gender: {
    label: 'Gender',
    options: [
      {label: 'Masculine', code: 'M'},
      {label: 'Feminine', code: 'F'},
      {label: 'Neuter', code: 'N'}
    ]
  },

  degree: {
    label: 'Degree',
    options: [
      {label: 'Positive', code: '-'},
      {label: 'Comparative', code: 'C'},
      {label: 'Superlative', code: 'S'}
    ]
  }
})
