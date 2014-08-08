var Parsing = require('./parsing')
var Immutable = require('immutable')

module.exports = function(morphCode) {
  var personCode = morphCode.substr(0,1)
  var tenseCode = morphCode.substr(1,1)
  var voiceCode = morphCode.substr(2,1)
  var moodCode = morphCode.substr(3,1)
  var caseCode = morphCode.substr(4,1)
  var numberCode = morphCode.substr(5,1)
  var genderCode = morphCode.substr(6,1)
  var degreeCode = morphCode.substr(7,1)

  return Immutable.Map({
    'person': Parsing.get('person').get('options').find(function(option) {
      return option.get('code') === personCode
    }),

    'tense': Parsing.get('tense').get('options').find(function(option) {
      return option.get('code') === tenseCode
    }),

    'voice': Parsing.get('voice').get('options').find(function(option) {
      return option.get('code') === voiceCode
    }),

    'mood': Parsing.get('mood').get('options').find(function(option) {
      return option.get('code') === moodCode
    }),

    'case': Parsing.get('case').get('options').find(function(option) {
      return option.get('code') === caseCode
    }),

    'number': Parsing.get('number').get('options').find(function(option) {
      return option.get('code') === numberCode
    }),

    'gender': Parsing.get('gender').get('options').find(function(option) {
      return option.get('code') === genderCode
    }),

    'degree': Parsing.get('degree').get('options').find(function(option) {
      return option.get('gender') === degreeCode
    })
  })
}
