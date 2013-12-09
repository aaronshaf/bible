App.ChapterRoute = Ember.Route.extend({
  model: function(params) {
  	var model = {};
    try {
      var bookOsisId = this.modelFor('book').osisID;
      var parsedReferenceQuery = bcv.parse(bookOsisId + ' ' + params.chapter).parsed_entities();
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      var paddedChapter = pad(chapter,3);
      model = Ember.Object.create({
        "chapter": chapter,
        "paragraphs": []
      });
      Ember.$.getJSON('../vendor/sblgnt/json/' + bookOsisId + '/' + paddedChapter + '-paragraphs.json').then(function(data) {
        model.set('paragraphs',data);
      });
    } catch(e) {}

    return model;
  }
});

// http://stackoverflow.com/a/10073764/176758
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}