var request = require('superagent')
var env = require('../config/env')
var Immutable = require('immutable')
var cache = require('./cache')

exports.findByBookAndChapterNumber = function(bookOsisId, number, callback) {
  var url = env.API_HOST + 'greek/sblgnt/json/' + bookOsisId + '/' + number + '.json'
  var cachedResult

  if (cachedResult = cache.get([url])) {
    return callback(null, Immutable.fromJS(cachedResult))
  }

  this.req = request
    .get(url)
    .set('Accept', 'application/json')
    .end(function (error, result) {
      if (error) return callback(error)

      cache.set([url], result.body)
      return callback(null, Immutable.fromJS(result.body))
    })
}
