// Calm down. We can split these into different files later.

var bcv = new bcv_parser;

App = Ember.Application.create({
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_ACTIVE_GENERATION: true,
  // LOG_VIEW_LOOKUPS: true
});

App.Router.map(function() {
  this.resource('book', { path: '/:osisID' }, function() {
    this.resource('chapter', { path: '/:chapter' }, function() {
      this.resource('verse', { path: '/:verse' }, function() {
        this.resource('greekWord', { path: '/greek/:word' }, function() {

        });
      });
    });
  });
});

App.ApplicationController = Ember.Controller.extend({
  lastQueryResult: {},
  searchQueryObserver: function() {
    if(this.get('searchQuery.length') < 4) return;

    try {
      var parsedReferenceQuery = bcv.parse(this.get('searchQuery')).parsed_entities();
      var book = parsedReferenceQuery[0].entities[0].start.b;
      var chapter = parsedReferenceQuery[0].entities[0].start.c;
      var verse = parsedReferenceQuery[0].entities[0].start.v;

      if(this.get('lastQueryResult.book') === book &&
          this.get('lastQueryResult.chapter') === chapter) {
        return
      }
      
      this.transitionToRoute('chapter',book,chapter);

      this.set('lastQueryResult.book',book);
      this.set('lastQueryResult.chapter',chapter);
      this.set('lastQueryResult.verse',verse);
    } catch(e) {}
  }.observes('searchQuery')
});

// http://stackoverflow.com/a/10073764/176758
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

App.SearchFieldView = Ember.TextField.extend({
    attributeBindings: ['results','autofocus']
});

/*
Ember.subscribe('render', {
  before: function(name, start, payload){
    return start
  },
  after: function(name, end, payload, start){
    var duration = Math.round(end - start)
    console.log(payload)
    var template = payload.template
    // if (template){ // this is to filter out anonymous templates
      // console.log('rendered', template, 'took', duration, 'ms')
    // }
  }
})
*/

// Ember.Handlebars.helper('logTime', function(someField){
//   var d = new Date,
//     timestamp = d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + "." + d.getMilliseconds();
//   console.log(timestamp + " - " + someField);
//   return "";
//  });