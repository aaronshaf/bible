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