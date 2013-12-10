// Calm down. We can split these into different files later.

var bcv = new bcv_parser;

App = Ember.Application.create({
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_ACTIVE_GENERATION: true,
  // LOG_VIEW_LOOKUPS: true
});

App.Router.map(function() {
  this.resource('book', { path: '/:osisID' }, function() {
    this.resource('chapter', { path: '/:chapter' }, function() {
      this.resource('verse', { path: '/:verse' }, function() {
        this.resource('greekWord', { path: '/greek/:word' }, function() {

        });
      });
    });
  });
});

App.ApplicationController = Ember.Controller.extend({
  lastQueryResult: {},
  searchQueryObserver: function() {
    if(this.get('searchQuery.length') < 4) return;

    try {
      var parsedReferenceQuery = bcv.parse(this.get('searchQuery')).parsed_entities();
      var book = parsedReferenceQuery[0].entities[0].start.b;
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      var verse = parsedReferenceQuery[0].entities[0].start.v;

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
App.ApplicationRoute = Ember.Route.extend({
  model: function(params) {
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.later(function() {
        Ember.$.getJSON('../vendor/bible-data/books/index.json').then(function(data) {
          resolve(data.slice(39).map(function(book) {
            return Ember.Object.create(book);
          }));
        });
      });
    });
  }
});

App.BookRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').findBy('osisID',params.osisID);

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
    var model = {};
    try {
      var bookOsisId = this.modelFor('book').osisID;
      var parsedReferenceQuery = bcv.parse(bookOsisId + ' ' + params.chapter).parsed_entities();
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      
      model = Ember.Object.create({
        "chapter": chapter
      });

    } catch(e) {}

    return model;
  }
});
App.ChapterIndexRoute = Ember.Route.extend({
  model: function(params) {
    var book = this.modelFor('book');
    var chapter = this.modelFor('chapter');
    var paddedChapter = pad(chapter.chapter,3);
        
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.later(function() {
        Ember.$.getJSON('../vendor/bible-data/greek/sblgnt/json/' + book.get('osisID') + '/' + paddedChapter + '.json').then(function(data) {
          var model = Ember.Object.create({
            "verses": Ember.Object.create(),
            "paragraphs": []
          });

          console.timeEnd('xhr')

          console.time('process data 1')
          data.verses.forEach(function(verse,index) {
            verse = verse.map(function(word) {
              return {
                partOfSpeech: word[0],
                morph: word[1],
                raw: word[2],
                lemma: word[5]
              }
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
App.GreekWordRoute = Ember.Route.extend({
  model: function(params) {
    console.log('GreekWordRoute params',params);
  }
});
App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    // this.transitionTo('chapter','Matthew',1);
  }
});
App.VerseRoute = Ember.Route.extend({
  model: function(params) {
    var model = {};
    try {
      var parsedReferenceQuery = bcv.parse(this.modelFor('book').osisID + ' ' + this.modelFor('chapter').chapter + ' ' + params.verse).parsed_entities();
      model = {
        "verse": parsedReferenceQuery[0].entities[0].start.v
      };
    } catch(e) {}

    return model;
  }
});
