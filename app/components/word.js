/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="bible-word-info">
        Word: {this.props.params.word}
      </div>
    )
  }
})
