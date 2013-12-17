App.GreekWordRoute = Ember.Route.extend({
  model: function(params) {
  	return this.modelFor('verse').get('words').findBy("position",params.position);
  }
});