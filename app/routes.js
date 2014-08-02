/** @jsx React.DOM */

var Route = require('react-router').Route
var Routes = require('react-router').Routes
var App = require('./components/app')

var routes = (
  <Routes>
    <Route handler={App}>
      <Route
          name="index"
          path="/"
          handler={require('./components/index')} />
      <Route
          name="book"
          path="/books/:book"
          handler={require('./components/book')}>
        <Route
            name="verse"
            path="/books/:book/:chapter/:paragraph/:verse/:word"
            handler={require('./components/greek-word')} />
      </Route>
    </Route>
  </Routes>
)

module.exports = routes
