// Calm down. We can split these into different files later.

var bcv = new bcv_parser;

App = Ember.Application.create({
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true
});

App.Router.map(function() {
  this.resource('book', { path: '/:id' }, function() {
    this.resource('chapter', { path: '/:chapter' }, function() {
      this.resource('verse', { path: '/:id' }, function() {

      });
    });
  });
});
App.BookRoute = Ember.Route.extend({
  model: function(params) {
    var model = Ember.Object.create({
      id: params.id
    });
    try {
      var parsedReferenceQuery = bcv.parse(params.id + ' 1:1').parsed_entities();
      var book = parsedReferenceQuery[0].entities[0].start.b;
      var chapterNumbers = [];
      bcv_parser.prototype.translations.default.chapters[book].forEach(function(verseCount,index) {
        chapterNumbers.push(String(index + 1));
      });
      model.setProperties({
        "name": book, // todo: replace this with full name
        "osisID": book,
        "order": bcv_parser.prototype.translations.default.order[book],
        "chapters": bcv_parser.prototype.translations.default.chapters[book],
        "chapterNumbers": chapterNumbers
      });
      Ember.$.getJSON('../vendor/lexham-english-bible/json/' + book + '.json').then(function(data) {
        model.setProperties(data);
      });
    } catch(e) {}
    
    return model;
  }
});
App.ChapterRoute = Ember.Route.extend({
  model: function(params) {
  	var model = {};
    try {
      var bookOsisId = this.modelFor('book').osisID;
      var parsedReferenceQuery = bcv.parse(bookOsisId + ' ' + params.chapter).parsed_entities();
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      var paddedChapter = pad(chapter,3);
      model = Ember.Object.create({
        "chapter": chapter,
        "paragraphs": []
      });
      Ember.$.getJSON('../vendor/bible-data/greek/sblgnt/json/' + bookOsisId + '/' + paddedChapter + '.json').then(function(data) {
        model.set('paragraphs',data.paragraphs.map(function(verses) {
          var stuff = verses.map(function(verse){
            return data.verses[parseInt(verse) - 1];
          });
          console.log(stuff)
          return stuff;
        }));
      });
    } catch(e) {}

    return model;
  }
});

// http://stackoverflow.com/a/10073764/176758
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
App.IndexRoute = Ember.Route.extend({
  model: function() {
    
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
