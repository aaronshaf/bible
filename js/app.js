// Calm down. We can split these into different files later.

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

var bcv = new bcv_parser;

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.BookRoute = Ember.Route.extend({
  model: function(params) {
    try {
      var parsedReferenceQuery = bcv.parse(params.book + ' 1:1').parsed_entities();  
      return {
        "name": parsedReferenceQuery[0].entities[0].start.b, // todo: replace this with full name
        "osisID": parsedReferenceQuery[0].entities[0].start.b,
        "order": bcv_parser.prototype.translations.default.order[book]
      };
    } catch(e) {}

    return {}; // todo: 404
  }
});

App.ChapterRoute = Ember.Route.extend({
  model: function(params) {
    try {
      var parsedReferenceQuery = bcv.parse(this.modelFor('book').osisID + ' ' + params.chapter).parsed_entities();
      return {
        "chapter": parsedReferenceQuery[0].entities[0].start.c
      };
    } catch(e) {}

    return {}; // todo: 404
  }
});

App.VerseRoute = Ember.Route.extend({
  model: function(params) {
    try {
      var parsedReferenceQuery = bcv.parse(this.modelFor('book').osisID + ' ' + this.modelFor('chapter').chapter + ' ' + params.verse).parsed_entities();
      return {
        "verse": parsedReferenceQuery[0].entities[0].start.v
      };
    } catch(e) {}

    return {}; // todo: 404
  }
});
