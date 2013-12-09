App.BookRoute = Ember.Route.extend({
  model: function(params) {
    var model = Ember.Object.create({
      id: params.id
    });
    try {
      var parsedReferenceQuery = bcv.parse(params.id + ' 1:1').parsed_entities();
      var book = parsedReferenceQuery[0].entities[0].start.b;
      var chapterNumbers = [];
      bcv_parser.prototype.translations.default.chapters[book].forEach(function(verseCount,index) {
        chapterNumbers.push(String(index + 1));
      });
      model.setProperties({
        "name": book, // todo: replace this with full name
        "osisID": book,
        "order": bcv_parser.prototype.translations.default.order[book],
        "chapters": bcv_parser.prototype.translations.default.chapters[book],
        "chapterNumbers": chapterNumbers
      });
      Ember.$.getJSON('../vendor/lexham-english-bible/json/' + book + '.json').then(function(data) {
        model.setProperties(data);
      });
    } catch(e) {}
    
    return model;
  }
});