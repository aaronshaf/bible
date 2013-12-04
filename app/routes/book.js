App.BookRoute = Ember.Route.extend({
  model: function(params) {
    var model = Ember.Object.create();
    try {
      var parsedReferenceQuery = bcv.parse(params.book + ' 1:1').parsed_entities();
      var book = parsedReferenceQuery[0].entities[0].start.b;
      model.setProperties({
        "name": book, // todo: replace this with full name
        "osisID": book,
        "order": bcv_parser.prototype.translations.default.order[book]
      });
      Ember.$.getJSON('../vendor/lexham-english-bible/json/' + book + '.json').then(function(data) {
        model.setProperties(data);
      });
    } catch(e) {}
    
    return model;
  }
});
