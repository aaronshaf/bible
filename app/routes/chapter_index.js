App.ChapterIndexRoute = Ember.Route.extend({
  model: function(params) {
    var book = this.modelFor('book');
    var chapter = this.modelFor('chapter');
    var API_HOST;

    if(window.location.host.indexOf('localhost') > -1) {
      API_HOST = 'http://localhost:8081/';
    } else {
      API_HOST = 'http://api.bible.theopedia.com/';
    }
        
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.later(function() {
        Ember.$.getJSON(API_HOST + 'greek/sblgnt/json/' + book.get('osisID') + '/' + chapter.chapter + '.json').then(function(data) {
          var model = Ember.Object.create({
            "verses": Ember.Object.create(),
            "paragraphs": []
          });

          data.verses.forEach(function(verse,index) {
            verse = verse.map(function(word) {
              return {
                partOfSpeech: word[0],
                morph: word[1],
                raw: word[2],
                lemma: word[5]
              }
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