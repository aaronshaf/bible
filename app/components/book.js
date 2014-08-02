/** @jsx React.DOM */

var React = require('react')
var Chapter = require('../models/chapter')
var Immutable = require('immutable')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      verses: Immutable.Vector(),
      paragraphs: Immutable.Vector()
    }
  },

  componentDidMount: function componentDidMount() {
    var book = this.props.params.book
    var number = 1
    Chapter.findByBookAndNumber(book,number,function(err,res) {
      this.setState({
        verses: res.get('verses'),
        paragraphs: res.get('paragraphs')
      })
    }.bind(this))
  },

  componentWillUnmount: function () {
    // if (this.req)
    //   this.req.abort();
  },

  render: function render() {
    var paragraphs = this.state.paragraphs.map(function(paragraph){
      var verses = paragraph.map(function(verseNumber) {
        // TODO: Without this, itsbreaks on Jude, etc. Why?
        if(this.state.verses.length < verseNumber) return null

        var words = this.state.verses.get(verseNumber-1).map(function(word) {
          var displayWord = word.get(2)
          return (
            <span>
              <span className="bible-word">{displayWord}</span>
              <span className="bible-word-divider"> </span>
            </span>
          )
        }).toArray()
        return (
          <span className="bible-verse">
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
    }.bind(this)).toArray()

    return (
      <article className="bible-chapter">
        {paragraphs}
      </article>
    )
  }
})
