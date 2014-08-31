var PORT = 4201
process.env.PORT = PORT
var HOST = 'http://localhost:' + PORT + '/'
require('../../main')

var chai = require("chai")
var chaiAsPromised = require("chai-as-promised")
var range = require('lodash-node/modern/arrays/range')
chai.use(chaiAsPromised)
chai.should()

var wd = require('wd')
var asserters = wd.asserters
chaiAsPromised.transferPromiseness = wd.transferPromiseness

var screenshotPath = process.env.CIRCLE_ARTIFACTS || 'tests/functional/screenshots/' 

describe('Greek New Testament', function() {
  this.timeout(30000)
  var browser

  before(function() {
    browser = wd.promiseChainRemote()
    return browser.init({browserName:'chrome'}).setWindowSize(1200,800)
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

  it("should forward-traverse chapters in Matthew", function() {
    browser = browser.get(HOST + "matthew/1")
      //.saveScreenshot(screenshotPath + '/sanity.png')
      .title().should.become("Matthew 1")
      .waitForElementByClassName('bible-word', asserters.isDisplayed, 500, 10)
//      .hasElementByLinkText('Βίβλος')
  //      .should.become(true)
   //   .hasElementByLinkText('παρέλαβεν')
    //    .should.become(true)
      .waitForElementByClassName('bible-next-icon', asserters.isDisplayed, 500, 10)

    range(2,4).forEach(function(chapter) {
      browser = browser
        .waitForElementByClassName('bible-next-icon', asserters.isDisplayed, 500, 10)
          .click()
        .title().should.become("Matthew " + chapter)
    })

    return browser
  })

  it("should backward-traverse chapters in Matthew", function() {
    browser = browser.get(HOST + "matthew/5")
      .waitForElementByClassName('bible-word')
    
    range(4,1, -1).forEach(function(chapter) {
      browser = browser
        .waitForElementByClassName('bible-previous-icon').click()
        .title().should.become("Matthew " + chapter)
    })

    return browser
  })

  it("should show noun information", function() {
     browser = browser.get(HOST + "matthew/1")
       .waitForElementByClassName('bible-word')
       .waitForElementByLinkText('Βίβλος')
       .click()
       .waitForElementByClassName('bible-word-info', asserters.textInclude('the inner bark'))
       .waitForElementByClassName('bible-word-info', asserters.textInclude('βίβλῳ'))
       .waitForElementByClassName('bible-word-info', asserters.textInclude('βίβλους'))

    return browser
  })

  it("should show verb information", function() {
     browser = browser
       .waitForElementByClassName('bible-word')
       .waitForElementByLinkText('ἐγέννησεν')
       .click()
       .waitForElementByClassName('bible-word-info', asserters.textInclude('to beget'))
       .waitForElementByClassName('bible-word-info', asserters.textInclude('γεννηθῇ'))

    return browser
  })

  it("should show article information", function() {
     browser = browser
       .waitForElementByClassName('bible-word')
       .waitForElementByLinkText('τὸν')
       .click()
       .waitForElementByClassName('bible-word-info', asserters.textInclude('τῆς'))
       .waitForElementByClassName('bible-word-info', asserters.textInclude('ταῖς'))

    return browser
  })
 })
