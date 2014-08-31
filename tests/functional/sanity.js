require('../../main')
require('colors')
var chai = require("chai")
var chaiAsPromised = require("chai-as-promised")
var range = require('lodash-node/modern/arrays/range')
chai.use(chaiAsPromised)
chai.should()

var wd = require('wd')
chaiAsPromised.transferPromiseness = wd.transferPromiseness

var screenshotPath = process.env.CIRCLE_ARTIFACTS || 'tests/functional/screenshots/' 

describe('sanity test', function() {
  this.timeout(30000)
  var browser

  before(function() {
    browser = wd.promiseChainRemote()
    browser.on('status', function(info) {
      console.log(info.cyan)
    })
    browser.on('command', function(eventType, command, response) {
      console.log(' > ' + eventType.cyan, command, (response || '').grey)
    })
    browser.on('http', function(meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })
    return browser.init({browserName:'chrome'})
  })

  after(function() {
    return browser
      .quit()
  })

  var traverseChapter = function(browser,chapter) {
    return browser
      .elementByClassName('bible-next-icon').click()
      .title().should.become("Matthew " + chapter)
  }

  it("should traverse all the chapters of Matthew", function() {
    browser = browser.get("http://localhost:4200/matthew/1")
      .saveScreenshot(screenshotPath + '/sanity.png')
      .title().should.become("Matthew 1")
      .waitForElementByClassName('bible-word')
      .hasElementByLinkText('Βίβλος').should.become(true)
      .hasElementByLinkText('παρέλαβεν').should.become(true)
      .waitForElementByClassName('bible-next-icon')

    range(2,27).forEach(function(chapter) {
      browser = browser
        .waitForElementByClassName('bible-next-icon').click()
        .title().should.become("Matthew " + chapter)
    })

    return browser
  })
})
