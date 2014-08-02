var request = require('superagent')
var env = require('../config/env')
var Immutable = require('immutable')

exports.findByBookAndNumber = function(book, number, callback) {
  var url = env.API_HOST + 'greek/sblgnt/json/' + book + '/' + number + '.json'

  this.req = request
    .get(url)
    .set('Accept', 'application/json')
    .end(function (error, result) {
      if (error) return callback(error)

      // cache.set([url, query], result.body)
      callback(null, Immutable.fromJS(result.body))
    })
}
