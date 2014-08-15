/** @jsx React.DOM */

var React = require('react')
var Verse = require('./verse')
var Immutable = require('immutable')

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.any.isRequired,
    chapter: React.PropTypes.any.isRequired,
    verses: React.PropTypes.any.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    var sameBook = this.props.book === nextProps.book
    var sameChapter = this.props.chapter === nextProps.chapter

    return !(sameBook && sameChapter && Immutable.is(this.props.verses,nextProps.verses))
  },

  render: function() {
    var verses = this.props.verses.map(function(verse) {
      var verseNumber = verse.get('number')
      var words = verse.get('words')

      return (
        <Verse
          key={verseNumber}
          book={this.props.book}
          chapter={this.props.chapter}
          verseNumber={verseNumber}
          words={words}
        />
      )
    }.bind(this)).toArray()
    return (
      <p className="bible-paragraph">
        {verses}
      </p>
    )
  }
})
