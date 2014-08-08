/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  render: function render() {
    return (
      <section className="bible-main-right-section">
        <div className="bible-chapter-container">
          <img src="/img/book.svg" className="bible-loading" />
        </div>
      </section>
    )
  }
})
