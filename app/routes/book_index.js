App.BookIndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('chapter',1);
  }
});