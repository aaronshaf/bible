/** @jsx React.DOM */

var Route = require('react-router').Route
var Routes = require('react-router').Routes
var App = require('./components/app')

var routes = (
  <Routes location="history">
    <Route
        name="index"
        path="/"
        handler={require('./components/index')}/>
    <Route
        name="book"
        path=":book"
        handler={require('./components/book')}>
      <Route
          name="chapter"
          path=":chapter"
          handler={require('./components/chapter')} addHandlerKey={true}>
        <Route
            name="verse"
            path=":verse/:wordIndex/:word"
            handler={require('./components/word-info')} addHandlerKey={true}/>
      </Route>
    </Route>
  </Routes>
)

module.exports = routes
