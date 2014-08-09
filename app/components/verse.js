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
    return nextProps.book !== this.props.book ||
            nextProps.chapter !== this.props.chapter ||
            nextProps.verseNumber !== this.props.verseNumber
  },

  render: function() {
    if(!this.props.words.length) return
    var words = this.props.words.map(function(word,wordIndex) {
      return (
        <Word
          key={wordIndex}
          book={this.props.book}
          chapter={this.props.chapter}
          verseNumber={this.props.verseNumber}
          word={word}
          wordIndex={wordIndex + 1}
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
