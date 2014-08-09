/** @jsx React.DOM */

var React = require('react')
var BooksMenu = require('./books-menu')

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <main className="main">
          <BooksMenu />
          <this.props.activeRouteHandler />
        </main>
        <a
            href="https://github.com/aaronshaf/bible#heartfelt-thanks"
            className="bible-license-credit">
          <span>SBLGNT &amp; Mounce</span>
        </a>
      </div>
    )
  }
})
