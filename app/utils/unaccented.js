var unorm = require('unorm')

module.exports = function(str) {
  var composed = unorm.nfc(str).toLowerCase()
  var unaccented = []
  composed.split('').forEach(function(char) {
    unaccented.push(unorm.nfd(char)[0])
  })
  return unaccented.join('')
}
