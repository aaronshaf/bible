var ua = require('universal-analytics')
var env = require('./env.js')
var visitor
if(env.googleAnalyticsTrackingId) {
  visitor = ua(env.googleAnalyticsTrackingId)
}

var TrackedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if(env.googleAnalyticsTrackingId && visitor) {
        visitor.pageview(decodeURIComponent(location.pathname)).send()
      }
    }
  }
}

module.exports = TrackedRoute

