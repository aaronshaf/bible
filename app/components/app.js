/** @jsx React.DOM */

var React = require('react')
var BooksMenu = require('./books-menu')

module.exports = React.createClass({
  render: function () {
    return (
      <main className="main">
        <BooksMenu />
        <div className="bible-main">
          <this.props.activeRouteHandler />
        </div>
      </main>
    )
  }
})
