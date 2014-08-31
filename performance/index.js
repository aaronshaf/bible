var range = require('../node_modules/lodash-node/modern/arrays/range')
var casper = require('casper').create();

var url = 'http://dev.local:4200/matthew/'

casper.start()

range(1,25).forEach(function(chapter) {
  casper.thenOpen(url + chapter, function() {
    casper.wait(210,function() {
      console.log(url + chapter)
      // casper.page.sendEvent('keypress', casper.page.event.key.K)
      this.waitForText("Timothy")
      this.echo(this.getTitle())
      this.echo(this.getHTML());
    })
  })
})

casper.run();
