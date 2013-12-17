App.ChapterIndexRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('chapter');
  }
});