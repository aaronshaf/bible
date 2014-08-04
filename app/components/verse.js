/** @jsx React.DOM */

var React = require('react')
var Word = require('./word')

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.any.isRequired,
    chapter: React.PropTypes.any.isRequired,
    verseNumber: React.PropTypes.any.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    return
      nextProps.book !== this.props.book ||
      nextProps.chapter !== this.props.chapter ||
      nextProps.verseNumber !== this.props.verseNumber
  },

  render: function() {
    var words = this.props.words.map(function(word) {
      return (
        <Word
          book={this.props.book}
          chapter="1"
          verseNumber={this.props.verseNumber}
          word={word}
        />
      )
    }.bind(this)).toArray()

    return (
      <span className="bible-verse" >
        <span className="bible-verse-number">{this.props.verseNumber} </span>
        {words}
      </span>
    )
  }
})
