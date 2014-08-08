/** @jsx React.DOM */

var React = require('react')
var Paragraph = require('./paragraph')
var Immutable = require('immutable')
var BookModel = require('../models/book')
var ChapterModel = require('../models/chapter')
// var Link = require('react-router').Link

module.exports = React.createClass({
  // propTypes: {
  //   book: React.PropTypes.any.isRequired,
  //   chapter: React.PropTypes.any.isRequired,
  //   paragraphs: React.PropTypes.any.isRequired,
  //   verses: React.PropTypes.any.isRequired
  // },

  getInitialState: function() {
    return {
      verses: Immutable.Vector(),
      paragraphs: Immutable.Vector()
    }
  },

  componentDidMount: function componentDidMount() {
    var book = BookModel.findByPath(this.props.params.book)
    var bookOsisId = book.osisID
    var chapterNumber = this.props.params.chapter

    ChapterModel.findByBookAndChapterNumber(bookOsisId,chapterNumber,function(err,res) {
      if(err) return
      this.setState({
        paragraphs: res.get('paragraphs'),
        verses: res.get('verses')
      })
    }.bind(this))

    ChapterModel.findNextChapter(book,chapterNumber,function(err,res) {
      if(err) return
      // this.setState({
      //   nextChapterLink: ...
      // })
    })
  },

  render: function render() {
    var paragraphKey = 0
    var paragraphs = this.state.paragraphs.map(function(verseNumbers) {
      return (
        <Paragraph
          key={'paragraph-' + paragraphKey++}
          book={this.props.params.book}
          chapter={this.props.params.chapter}
          verseNumbers={verseNumbers}
          verses={this.state.verses}
        />
      )
    }.bind(this)).toArray()

    return (
      <section className="bible-chapter-container">
        <article className="bible-chapter">
          {paragraphs}
        </article>
        <this.props.activeRouteHandler />
      </section>
    )
  }
})
