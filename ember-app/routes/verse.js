App.VerseRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('chapter').get('verses').get(params.number);
  }
});
