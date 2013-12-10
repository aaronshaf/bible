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
