App.VerbChartComponent = Ember.Component.extend({
	persons: function() {
		var code = this.get('code');
		var forms = this.get('forms');

		var mood_code = this.get('code')[0];
		var voice_code = this.get('code')[1];
		var number_code = this.get('code')[2];

		var persons = App.persons.map(function(person) {
			return App.tenses.map(function(tense) {
				if(typeof forms['V-' + person.code + tense.code + voice_code + mood_code + '-' + number_code + '--'] !== 'undefined') {
					return {
						raw: forms['V-' + person.code + tense.code + voice_code + mood_code + '-' + number_code + '--'][0][1],
						frequency: forms['V-' + person.code + tense.code + voice_code + mood_code + '-' + number_code + '--'].length
					}
				} else {
					return {};
				}
			});
		});

		// console.log('persons',persons);

		return persons;

		// // {{wordData.forms['V-' + person.code + tense.code + voice.code + mood.code + '-' + number.code + '--'][0][1]}}
	}.property('code','forms')
});
var bcv = new bcv_parser;



App.Router.map(function() {
  this.resource('book', { path: '/:path' }, function() {
    this.resource('chapter', { path: '/:chapter' }, function() {
      this.resource('verse', { path: '/:number' }, function() {
        this.resource('greekWord', { path: '/sblgnt/:position' }, function() {
          
        });
      });
    });
  });
});

App.Router.reopen({
  location: 'history'
});

App.ApplicationController = Ember.Controller.extend({
  lastQueryResult: {},
  searchQueryObserver: function() {
    if(this.get('searchQuery.length') < 4) return;

    try {
      var parsedReferenceQuery = bcv.parse(this.get('searchQuery')).parsed_entities();
      var bookOsisID = parsedReferenceQuery[0].entities[0].start.b;
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      var verse = parsedReferenceQuery[0].entities[0].start.v;

      var book = this.get('model').findBy('osisID',bookOsisID);

      if(this.get('lastQueryResult.book') === book &&
          this.get('lastQueryResult.chapter') === chapter) {
        return
      }
      
      this.transitionToRoute('chapter',book,chapter);

      this.set('lastQueryResult.book',book);
      this.set('lastQueryResult.chapter',chapter);
      this.set('lastQueryResult.verse',verse);
    } catch(e) {}
  }.observes('searchQuery')
});

// http://stackoverflow.com/a/10073764/176758
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

App.SearchFieldView = Ember.TextField.extend({
    attributeBindings: ['results','autofocus']
});

/*
Ember.subscribe('render', {
  before: function(name, start, payload){
    return start
  },
  after: function(name, end, payload, start){
    var duration = Math.round(end - start)
    console.log(payload)
    var template = payload.template
    // if (template){ // this is to filter out anonymous templates
      // console.log('rendered', template, 'took', duration, 'ms')
    // }
  }
})
*/

// Ember.Handlebars.helper('logTime', function(someField){
//   var d = new Date,
//     timestamp = d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + "." + d.getMilliseconds();
//   console.log(timestamp + " - " + someField);
//   return "";
//  });
App.Book = Ember.Object.extend({
  
});
App.Chapter = Ember.Object.extend({
  
});
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
App.Verse = Ember.Object.extend({
  
});
App.ApplicationRoute = Ember.Route.extend({
  model: function(params) {
    var books = [
      {
        "names": {
          "english": "Genesis"
        },
        "path": "genesis",
        "osisID": "Gen",
        "totalChapters": 50,
      },
      {
        "names": {
          "english": "Exodus"
        },
        "path": "exodus",
        "osisID": "Exod",
        "totalChapters": 40
      },
      {
        "names": {
          "english": "Leviticus"
        },
        "path": "leviticus",
        "osisID": "Lev",
        "totalChapters": 27
      },
      {
        "names": {
          "english": "Numbers"
        },
        "path": "numbers",
        "osisID": "Num",
        "totalChapters": 36
      },
      {
        "names": {
          "english": "Deuteronomy"
        },
        "path": "deuteronomy",
        "osisID": "Deut",
        "totalChapters": 34
      },
      {
        "names": {
          "english": "Joshua"
        },
        "path": "joshua",
        "osisID": "Josh",
        "totalChapters": 24
      },
      {
        "names": {
          "english": "Judges"
        },
        "path": "judges",
        "osisID": "Judg",
        "totalChapters": 21
      },
      {
        "names": {
          "english": "Ruth"
        },
        "path": "ruth",
        "osisID": "Ruth",
        "totalChapters": 4
      },
      {
        "names": {
          "english": "1 Samuel"
        },
        "path": "1samuel",
        "osisID": "1Sam",
        "totalChapters": 31
      },
      {
        "names": {
          "english": "2 Samuel"
        },
        "path": "2samuel",
        "osisID": "2Sam",
        "totalChapters": 24
      },
      {
        "names": {
          "english": "1 Kings"
        },
        "path": "1kings",
        "osisID": "1Kgs",
        "totalChapters": 22
      },
      {
        "names": {
          "english": "2 Kings"
        },
        "path": "2kings",
        "osisID": "2Kgs",
        "totalChapters": 25
      },
      {
        "names": {
          "english": "1 Chronicles"
        },
        "path": "1chronicles",
        "osisID": "1Chr",
        "totalChapters": 29
      },
      {
        "names": {
          "english": "2 Chronicles"
        },
        "path": "2chronicles",
        "osisID": "2Chr",
        "totalChapters": 36
      },
      {
        "names": {
          "english": "Ezra"
        },
        "path": "ezra",
        "osisID": "Ezra",
        "totalChapters": 10
      },
      {
        "names": {
          "english": "Nehemiah"
        },
        "path": "nehemiah",
        "osisID": "Neh",
        "totalChapters": 13
      },
      {
        "names": {
          "english": "Esther"
        },
        "path": "esther",
        "osisID": "Esth",
        "totalChapters": 10
      },
      {
        "names": {
          "english": "Job"
        },
        "path": "job",
        "osisID": "Job",
        "totalChapters": 42
      },
      {
        "names": {
          "english": "Psalms"
        },
        "path": "psalm",
        "osisID": "Ps",
        "totalChapters": 150
      },
      {
        "names": {
          "english": "Proverbs"
        },
        "path": "proverbs",
        "osisID": "Prov",
        "totalChapters": 31
      },
      {
        "names": {
          "english": "Ecclesiastes"
        },
        "path": "ecclesiastes",
        "osisID": "Eccl",
        "totalChapters": 12
      },
      {
        "names": {
          "english": "Song of Solomon"
        },
        "path": "songofsolomon",
        "osisID": "Song",
        "totalChapters": 8
      },
      {
        "names": {
          "english": "Isaiah"
        },
        "path": "isaiah",
        "osisID": "Isa",
        "totalChapters": 66
      },
      {
        "names": {
          "english": "Jeremiah"
        },
        "path": "jeremiah",
        "osisID": "Jer",
        "totalChapters": 52
      },
      {
        "names": {
          "english": "Lamentations"
        },
        "path": "lamentations",
        "osisID": "Lam",
        "totalChapters": 5
      },
      {
        "names": {
          "english": "Ezekiel"
        },
        "path": "ezekiel",
        "osisID": "Ezek",
        "totalChapters": 48
      },
      {
        "names": {
          "english": "Daniel"
        },
        "path": "daniel",
        "osisID": "Dan",
        "totalChapters": 12
      },
      {
        "names": {
          "english": "Hosea"
        },
        "path": "hosea",
        "osisID": "Hos",
        "totalChapters": 14
      },
      {
        "names": {
          "english": "Joel"
        },
        "path": "joel",
        "osisID": "Joel",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Amos"
        },
        "path": "amos",
        "osisID": "Amos",
        "totalChapters": 9
      },
      {
        "names": {
          "english": "Obadiah"
        },
        "path": "obadiah",
        "osisID": "Obad",
        "totalChapters": 1
      },
      {
        "names": {
          "english": "Jonah"
        },
        "path": "jonah",
        "osisID": "Jonah",
        "totalChapters": 4
      },
      {
        "names": {
          "english": "Micah"
        },
        "path": "micah",
        "osisID": "Mic",
        "totalChapters": 7
      },
      {
        "names": {
          "english": "Nahum"
        },
        "path": "nahum",
        "osisID": "Nah",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Habakkuk"
        },
        "path": "habakkuk",
        "osisID": "Hab",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Zephaniah"
        },
        "path": "zephaniah",
        "osisID": "Zeph",
        "totalChapters": 3
      },
      {
        "names": {
          "english": "Haggai"
        },
        "path": "haggai",
        "osisID": "Hag",
        "totalChapters": 2
      },
      {
        "names": {
          "english": "Zechariah"
        },
        "path": "zechariah",
        "osisID": "Zech",
        "totalChapters": 14
      },
      {
        "names": {
          "english": "Malachi"
        },
        "path": "malachi",
        "osisID": "Mal",
        "totalChapters": 4
      },
      {
        "names": {
          "english": "Matthew",
          "greek": "ΚΑΤΑ ΜΑΘΘΑΙΟΝ"
        },
        "path": "matthew",
        "osisID": "Matt",
        "totalChapters": 28,
        "abbreviations": [
          "Mt"
        ]
      },
      {
        "names": {
          "english": "Mark"
        },
        "path": "mark",
        "osisID": "Mark",
        "totalChapters": 16,
        "abbreviations": [
          "Mk"
        ]
      },
      {
        "names": {
          "english": "Luke"
        },
        "path": "luke",
        "osisID": "Luke",
        "totalChapters": 24,
        "abbreviations": [
          "Lk"
        ]
      },
      {
        "names": {
          "english": "John"
        },
        "path": "john",
        "osisID": "John",
        "totalChapters": 21,
        "abbreviations": [
          "Jn"
        ]
      },
      {
        "names": {
          "english": "Acts"
        },
        "path": "acts",
        "osisID": "Acts",
        "totalChapters": 28,
        "abbreviations": [
          "Ac"
        ]
      },
      {
        "names": {
          "english": "Romans"
        },
        "path": "romans",
        "osisID": "Rom",
        "totalChapters": 16,
        "abbreviations": [
          "Ro"
        ]
      },
      {
        "names": {
          "english": "1 Corinthians"
        },
        "path": "1corinthians",
        "osisID": "1Cor",
        "totalPassages": 437,
        "totalChapters": 16,
        "abbreviations": [
          "1Co"
        ]
      },
      {
        "names": {
          "english": "2 Corinthians"
        },
        "path": "2corinthians",
        "osisID": "2Cor",
        "totalChapters": 13,
        "abbreviations": [
          "2Co"
        ]
      },
      {
        "names": {
          "english": "Galatians"
        },
        "path": "galatians",
        "osisID": "Gal",
        "totalChapters": 6,
        "abbreviations": [
          "Ga"
        ]
      },
      {
        "names": {
          "english": "Ephesians"
        },
        "path": "ephesians",
        "osisID": "Eph",
        "totalChapters": 6,
        "abbreviations": [
          "Eph"
        ]
      },
      {
        "names": {
          "english": "Philippians"
        },
        "path": "philippians",
        "osisID": "Phil",
        "totalChapters": 4,
        "abbreviations": [
          "Php"
        ]
      },
      {
        "names": {
          "english": "Colossians"
        },
        "path": "colossians",
        "osisID": "Col",
        "totalChapters": 4,
        "abbreviations": [
          "Col"
        ]
      },
      {
        "names": {
          "english": "1 Thessalonians"
        },
        "path": "1thessalonians",
        "osisID": "1Thess",
        "totalChapters": 5,
        "abbreviations": [
          "1Th"
        ]
      },
      {
        "names": {
          "english": "2 Thessalonians"
        },
        "path": "2thessalonians",
        "osisID": "2Thess",
        "totalChapters": 3,
        "abbreviations": [
          "2Th"
        ]
      },
      {
        "names": {
          "english": "1 Timothy"
        },
        "path": "1timothy",
        "osisID": "1Tim",
        "totalChapters": 6,
        "abbreviations": [
          "1Ti"
        ]
      },
      {
        "names": {
          "english": "2 Timothy"
        },
        "path": "2timothy",
        "osisID": "2Tim",
        "totalChapters": 4,
        "abbreviations": [
          "2Ti"
        ]
      },
      {
        "names": {
          "english": "Titus"
        },
        "path": "titus",
        "osisID": "Titus",
        "totalChapters": 3,
        "abbreviations": [
          "Tit"
        ]
      },
      {
        "names": {
          "english": "Philemon"
        },
        "path": "philemon",
        "osisID": "Phlm",
        "totalChapters": 1,
        "abbreviations": [
          "Phm"
        ]
      },
      {
        "names": {
          "english": "Hebrews"
        },
        "path": "hebrews",
        "osisID": "Heb",
        "totalChapters": 13,
        "abbreviations": [
          "Heb"
        ]
      },
      {
        "names": {
          "english": "James"
        },
        "path": "james",
        "osisID": "Jas",
        "totalChapters": 5,
        "abbreviations": [
          "Jas"
        ]
      },
      {
        "names": {
          "english": "1 Peter"
        },
        "path": "1peter",
        "osisID": "1Pet",
        "totalChapters": 5,
        "abbreviations": [
          "1Pe"
        ]
      },
      {
        "names": {
          "english": "2 Peter"
        },
        "path": "2peter",
        "osisID": "2Pet",
        "totalChapters": 3,
        "abbreviations": [
          "2Pe"
        ]
      },
      {
        "names": {
          "english": "1 John"
        },
        "path": "1john",
        "osisID": "1John",
        "totalChapters": 5,
        "abbreviations": [
          "1Jn"
        ]
      },
      {
        "names": {
          "english": "2 John"
        },
        "path": "2john",
        "osisID": "2John",
        "totalChapters": 1,
        "abbreviations": [
          "2Jn"
        ]
      },
      {
        "names": {
          "english": "3 John"
        },
        "path": "3john",
        "osisID": "3John",
        "totalChapters": 1,
        "abbreviations": [
          "3Jn"
        ]
      },
      {
        "names": {
          "english": "Jude"
        },
        "path": "jude",
        "osisID": "Jude",
        "totalChapters": 1,
        "abbreviations": [
          "Jud"
        ]
      },
      {
        "names": {
          "english": "Revelation"
        },
        "path": "revelation",
        "osisID": "Rev",
        "totalChapters": 22,
        "abbreviations": [
          "Re"
        ]
      }
    ];

    return books.slice(39).map(function(book) {
      return Ember.Object.create(book);
    });
  }
});

App.BookRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').findBy('path',params.path);

    // return new Ember.RSVP.Promise(function(resolve,reject) {
    //   try {
    //     var model = Ember.Object.create({
    //       book: params.book
    //     });

    //     var parsedReferenceQuery = bcv.parse(params.book + ' 1:1').parsed_entities();
    //     var book = parsedReferenceQuery[0].entities[0].start.b;
    //     var chapterNumbers = [];

    //     bcv_parser.prototype.translations.default.chapters[book].forEach(function(verseCount,index) {
    //       chapterNumbers.push(String(index + 1));
    //     });
    //     model.setProperties({
    //       "name": book, // todo: replace this with full name
    //       "osisID": book,
    //       "order": bcv_parser.prototype.translations.default.order[book],
    //       "chapters": bcv_parser.prototype.translations.default.chapters[book],
    //       "chapterNumbers": chapterNumbers
    //     });
    //     // Ember.run.later(function() {
    //     //   Ember.$.getJSON('../vendor/lexham-english-bible/json/' + book + '.json').then(function(data) {
    //     //     model.setProperties(data);
        
    //     //   });
    //     // });
    //     resolve(model);
    //   } catch(e) {
    //     reject();
    //   }
    // });
  }
});
App.BookIndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('chapter',1);
    // return false;
  }
});
App.ChapterRoute = Ember.Route.extend({
  model: function(params) {
    var book = this.modelFor('book');

    var API_HOST;
    if(window.location.host.indexOf('localhost') > -1) {
      API_HOST = 'http://localhost:8081/';
    } else {
      API_HOST = 'http://api.bible.theopedia.com/';
    }
        
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.next(function() {
        Ember.$.getJSON(API_HOST + 'greek/sblgnt/json/' + book.get('osisID') + '/' + params.chapter + '.json').then(function(data) {
          var model = App.Chapter.create({
            "chapter": params.chapter,
            "verses": Ember.Object.create(),
            "paragraphs": []
          });

          data.verses.forEach(function(verse,index) {
            words = verse.map(function(word) {
              return App.GreekWord.create({
                position: String(verse.indexOf(word) + 1),
                partOfSpeechCode: word[0],
                morph: word[1],
                raw: word[2],
                word: word[3], // with punctuation stripped
                normalized_word: word[4],
                lemma: word[5]
              });
            });
            verse = App.Verse.create({
              number: String(index + 1),
              words: Ember.ArrayProxy.create({content: words})
            });
            model.get('verses').set(String(index + 1), verse);
          });

          model.set('paragraphs',data.paragraphs.map(function(verses) {
            var stuff = verses.map(function(verseNumber) {
              // console.log('verse' + verseNumber,model.get('verses').get(verseNumber))
              return model.get('verses').get(verseNumber)
            });
            // console.log(stuff)
            return stuff;
          }));

          resolve(model);

        });
      });
    });
  }
});
App.ChapterIndexRoute = Ember.Route.extend({
  model: function(params) {
    var chapter = this.modelFor('chapter');
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.next(function() {
        resolve(chapter);
      });
    });
  },

  afterModel: function(chapter) {
    chapter.set('ready',false);
    chapter.set('previewParagraphs',chapter.get('paragraphs').slice(0,2));
    Ember.run.later(function() {
      chapter.set('ready',true);
    },10);
  }
});
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
App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    // this.transitionTo('chapter','Matthew',1);
  }
});
App.VerseRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('chapter').get('verses').get(params.number);
  }
});
