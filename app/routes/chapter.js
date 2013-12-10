App.ChapterRoute = Ember.Route.extend({
  model: function(params) {
    var model = {};
    try {
      var bookOsisId = this.modelFor('book').osisID;
      var parsedReferenceQuery = bcv.parse(bookOsisId + ' ' + params.chapter).parsed_entities();
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      
      model = Ember.Object.create({
        "chapter": chapter
      });

    } catch(e) {}

    return model;
  }
});