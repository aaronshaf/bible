var API_HOST
if(location.hostname.indexOf('local') > -1) {
  API_HOST = 'https://s3.amazonaws.com/api.bible.theopedia.com/'
} else {
  API_HOST = 'http://api.bible.theopedia.com/'
}

module.exports = {
  API_HOST: API_HOST
}
