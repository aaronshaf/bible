/** @jsx React.DOM */

var Route = require('react-router').Route
var Routes = require('react-router').Routes
var App = require('./components/app')

var routes = (
  <Routes location="history">
    <Route handler={App}>
      <Route
          name="index"
          path="/"
          handler={require('./components/index')} />
      <Route
          name="book"
          path="/:book"
          handler={require('./components/book')}>
        <Route
            name="chapter"
            path="/:book/:chapter"
            handler={require('./components/chapter')}>
          <Route
              name="verse"
              path="/:book/:chapter/:verse/:wordIndex/:word"
              handler={require('./components/word-info')} />
        </Route>
      </Route>
    </Route>
  </Routes>
)

module.exports = routes
