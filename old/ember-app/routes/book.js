App.BookRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').findBy('path',params.path);

    // return new Ember.RSVP.Promise(function(resolve,reject) {
    //   try {
    //     var model = Ember.Object.create({
    //       book: params.book
    //     });

    //     var parsedReferenceQuery = bcv.parse(params.book + ' 1:1').parsed_entities();
    //     var book = parsedReferenceQuery[0].entities[0].start.b;
    //     var chapterNumbers = [];

    //     bcv_parser.prototype.translations.default.chapters[book].forEach(function(verseCount,index) {
    //       chapterNumbers.push(String(index + 1));
    //     });
    //     model.setProperties({
    //       "name": book, // todo: replace this with full name
    //       "osisID": book,
    //       "order": bcv_parser.prototype.translations.default.order[book],
    //       "chapters": bcv_parser.prototype.translations.default.chapters[book],
    //       "chapterNumbers": chapterNumbers
    //     });
    //     // Ember.run.later(function() {
    //     //   Ember.$.getJSON('../vendor/lexham-english-bible/json/' + book + '.json').then(function(data) {
    //     //     model.setProperties(data);
        
    //     //   });
    //     // });
    //     resolve(model);
    //   } catch(e) {
    //     reject();
    //   }
    // });
  }
});