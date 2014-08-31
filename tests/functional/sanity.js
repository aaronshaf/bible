var PORT = 4201
process.env.PORT = PORT
var HOST = 'http://localhost:' + PORT + '/'
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
  this.timeout(40000)
  var browser

  before(function() {
    browser = wd.promiseChainRemote()
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
    browser = browser.get(HOST + "matthew/1")
      //.saveScreenshot(screenshotPath + '/sanity.png')
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
