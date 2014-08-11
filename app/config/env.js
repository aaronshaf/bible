var API_HOST
if(location.hostname.indexOf('local') > -1) {
  API_HOST = '/api/'
} else {
  API_HOST = 'http://api.bible.theopedia.com/'
}

module.exports = {
  API_HOST: API_HOST
}
