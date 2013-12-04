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
