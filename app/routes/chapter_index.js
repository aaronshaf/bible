App.ChapterIndexRoute = Ember.Route.extend({
  model: function(params) {
    var chapter = this.modelFor('chapter');
    return new Ember.RSVP.Promise(function(resolve,reject) {
      Ember.run.next(function() {
        resolve(chapter);
      });
    });
  },

  afterModel: function(chapter) {
    chapter.set('ready',false);
    chapter.set('previewParagraphs',chapter.get('paragraphs').slice(0,2));
    Ember.run.later(function() {
      chapter.set('ready',true);
    },10);
  }
});