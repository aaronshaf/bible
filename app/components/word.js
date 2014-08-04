/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link
var unaccented = require('../utils/unaccented')

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.any.isRequired,
    chapter: React.PropTypes.any.isRequired,
    verseNumber: React.PropTypes.any.isRequired,
    book: React.PropTypes.any.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    return
      nextProps.book !== this.props.book ||
      nextProps.chapter !== this.props.chapter ||
      nextProps.verseNumber !== this.props.verseNumber
      // nextProps.word.get(5) !== this.props.word.get(5)
  },

  render: function() {
    var displayWord = this.props.word.get(2)

    return (
      <span>
        <Link
            to="verse"
            book={this.props.book}
            chapter={this.props.chapter}
            verse={this.props.verseNumber}
            word={unaccented(this.props.word.get(5))}
            className="bible-word">{displayWord}</Link>
        <span className="bible-word-divider"> </span>
      </span>
    )
  }
})
