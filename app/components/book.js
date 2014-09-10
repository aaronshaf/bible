/** @jsx React.DOM */

var React = require('react')
var BooksMenu = require('./books-menu')

module.exports = React.createClass({
  // getDefaultProps: function() {
  //   return {
  //     value: 'default value'
  //   }
  // },

  displayName: 'Book',

  render: function render() {
    return (
      <div>
        <main className="main">
          <BooksMenu activeBookPath={this.props.params.book} />
          <section className="bible-main-right-section">
            <this.props.activeRouteHandler />
          </section>
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
