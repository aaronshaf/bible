/** @jsx React.DOM */

var React = require('react')
var Verse = require('./verse')

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.any.isRequired,
    verseNumbers: React.PropTypes.any.isRequired,
    verses: React.PropTypes.any.isRequired
  },

  render: function() {
    var verses = this.props.verseNumbers.map(function(verseNumber) {
      // TODO: Without this, its breaks on Jude, etc. Why?
      if(this.props.verses.length < verseNumber) return null

      return (
        <Verse
          key={'verse-'+this.props.book+'-'+this.props.chapter+'-'+verseNumber}
          book={this.props.book}
          chapter="1"
          verseNumber={verseNumber}
          words={this.props.verses.get(verseNumber-1)}
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
