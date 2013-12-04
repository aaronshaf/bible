// Calm down. We can split these into different files later.

var bcv = new bcv_parser;

App = Ember.Application.create({
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true
});

App.Router.map(function() {
  this.resource('book', { path: '/:book' }, function() {
    this.resource('chapter', { path: '/:chapter' }, function() {
      this.resource('verse', { path: '/:verse/' }, function() {
        // this.resource('word', { path: '/:book/:chapter/:verse/:word' }, function() {
          
        // });
      });
    });
  });
});
App.BookRoute = Ember.Route.extend({
  model: function(params) {
    var model = Ember.Object.create();
    try {
      var parsedReferenceQuery = bcv.parse(params.book + ' 1:1').parsed_entities();
      var book = parsedReferenceQuery[0].entities[0].start.b;
      model.setProperties({
        "name": book, // todo: replace this with full name
        "osisID": book,
        "order": bcv_parser.prototype.translations.default.order[book]
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
      var parsedReferenceQuery = bcv.parse(this.modelFor('book').osisID + ' ' + params.chapter).parsed_entities();
      model = {
        "chapter": parsedReferenceQuery[0].entities[0].start.c
      };
    } catch(e) {}

    return model;
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
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
