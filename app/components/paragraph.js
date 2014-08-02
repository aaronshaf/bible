/** @jsx React.DOM */

var React = require('react')
var Link = require('react-router').Link
var Verse = require('./verse')

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
    var verseKey = 0
    var verses = this.props.verseNumbers.map(function(verseNumber) {
      // TODO: Without this, its breaks on Jude, etc. Why?
      if(this.props.verses.length < verseNumber) return null

      var words = this.props.verses.get(verseNumber-1).map(function(word) {
        var displayWord = word.get(2)
        return (
          <span key={Math.random()}>
            <Link
                to="verse"
                book={this.props.book}
                chapter="1"
                paragraph={this.props.key}
                verse={verseNumber}
                word={word.get(3)}
                className="bible-word">{displayWord}</Link>
            <span className="bible-word-divider"> </span>
          </span>
        )
      }.bind(this)).toArray()
      return (
        <span className="bible-verse" >
          <span className="bible-verse-number">{verseNumber} </span>
          {words}
        </span>
      )
    }.bind(this)).toArray()
    return (
      <p className="bible-paragraph">
        {verses}
      </p>
    )
  }
})
