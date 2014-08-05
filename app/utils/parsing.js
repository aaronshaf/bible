var Parsing = {}

Parsing.voices = [
  {label: 'Active', code: 'A'},
  {label: 'Middle', code: 'M'},
  {label: 'Passive', code: 'P'}
]

Parsing.partsOfSpeech = [
  {label: 'Noun', code: 'N-'},
  {label: 'Verb', code: 'V-'},
  {label: 'Adjective', code: 'A-'},
  {label: 'Conjunction', code: 'C-'},
  {label: 'Article', code: 'RA'},
  {label: 'Adverb', code: 'D-'},
  {label: 'Preposition', code: 'P-'},
  {label: 'Relative Pronoun', code: 'RP'},
  {label: 'Indefinite Pronoun', code: 'RI'}
]

Parsing.numbers = [
  {label: 'Singular', code: 'S'},
  {label: 'Plural', code: 'P'}
]

Parsing.persons = [
  {label: '1st person', code: '1'},
  {label: '2nd person', code: '2'},
  {label: '3rd person', code: '3'}
]

Parsing.genders = [
  {label: 'Masculine', code: 'M'},
  {label: 'Feminine', code: 'F'},
  {label: 'Neuter', code: 'N'}
]

Parsing.tenses = [
  {label: 'Present', code: 'P'},
  {label: 'Imperfect', code: 'I'},
  {label: 'Aorist', code: 'A'},
  {label: 'Future', code: 'F'},
  {label: 'Perfect', code: 'X'},
  {label: 'Pluperfect', code: 'Y'}
]

Parsing.moods = [
  {label: 'Indicative', code: 'I'},
  {label: 'Subjunctive', code: 'S'},
  {label: 'Optative', code: 'O'},
  {label: 'Imperative', code: 'D'},
  {label: 'Infinitive', code: 'N'},
  {label: 'Participle', code: 'P'}
]

Parsing.cases = [
  {label: 'Nominative', code: 'N'},
  {label: 'Genitive', code: 'G'},
  {label: 'Dative', code: 'D'},
  {label: 'Accusative', code: 'A'},
  {label: 'Vocative', code: 'V'}
]

Parsing.voices = [
  {label: 'Active', code: 'A'},
  {label: 'Middle', code: 'M'},
  {label: 'Passive', code: 'P'}
]

Parsing.degrees = [
  // {label: 'Positive', code: '-'},
  {label: 'Comparative', code: 'C'},
  {label: 'Superlative', code: 'S'}
]

Parsing.categories = [
  {
    key: 'person',
    label: 'Person',
    order: 0,
    options: ['1st','2nd','3rd']
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
    options: ['Masculine','Feminine','Neuter']
  },
  {
    key: 'degree',
    label: 'Degree',
    order: 7,
    options: ['Positive','Comparative','Superlative'] // Default is
  }
]

module.exports = Parsing
