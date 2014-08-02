/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.any.isRequired,
    verseNumbers: React.PropTypes.any.isRequired,
    verses: React.PropTypes.any.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    var shouldUpdate =
      nextProps.key !== this.props.key ||
      nextProps.book !== this.props.book
    return shouldUpdate
  },

  render: function() {

  }
})
