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
