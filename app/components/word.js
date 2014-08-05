/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link
var unaccented = require('../utils/unaccented')

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.any.isRequired,
    chapter: React.PropTypes.any.isRequired,
    verseNumber: React.PropTypes.any.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    // nextProps.word.get(5) !== this.props.word.get(5)
    return nextProps.book !== this.props.book ||
        nextProps.chapter !== this.props.chapter ||
        nextProps.verseNumber !== this.props.verseNumber
  },

  handleClick: function() {
    this.refs.link.getDOMNode().focus()
  },

  render: function() {
    var displayWord = this.props.word.get(2)

    return (
      <span onClick={this.handleClick}>
        <Link
            ref="link"
            to="verse"
            book={this.props.book}
            chapter={this.props.chapter}
            verse={this.props.verseNumber}
            word={unaccented(this.props.word.get(5))}
            wordIndex={this.props.wordIndex}
            className="bible-word">{displayWord}</Link>
        <span className="bible-word-divider"> </span>
      </span>
    )
  }
})
