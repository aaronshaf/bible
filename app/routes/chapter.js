App.ChapterRoute = Ember.Route.extend({
  model: function(params) {
    var book = this.modelFor('book');

    var API_HOST;
    if(window.location.host.indexOf('localhost') > -1) {
      API_HOST = 'http://localhost:8081/';
    } else {
      API_HOST = 'http://api.bible.theopedia.com/';
    }
        
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.later(function() {
        Ember.$.getJSON(API_HOST + 'greek/sblgnt/json/' + book.get('osisID') + '/' + params.chapter + '.json').then(function(data) {
          var model = Ember.Object.create({
            "chapter": params.chapter,
            "verses": Ember.Object.create(),
            "paragraphs": []
          });

          data.verses.forEach(function(verse,index) {
            words = verse.map(function(word) {
              return Ember.Object.create({
                position: String(verse.indexOf(word) + 1),
                partOfSpeech: word[0],
                morph: word[1],
                raw: word[2],
                word: word[3], // with punctuation stripped
                normalized_word: word[4],
                lemma: word[5]
              });
            });
            verse = Ember.Object.create({
              number: String(index + 1),
              words: Ember.ArrayProxy.create({content: words})
            });
            model.get('verses').set(String(index + 1), verse);
          });

          model.set('paragraphs',data.paragraphs.map(function(verses) {
            var stuff = verses.map(function(verseNumber) {
              // console.log('verse' + verseNumber,model.get('verses').get(verseNumber))
              return model.get('verses').get(verseNumber)
            });
            // console.log(stuff)
            return stuff;
          }));


          resolve(model);

        });
      });
    });
  }
});