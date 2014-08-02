/** @jsx React.DOM */

var React = require('react')
var ChapterModel = require('../models/chapter')
var Paragraph = require('./paragraph')
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
    ChapterModel.findByBookAndNumber(book,number,function(err,res) {
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
    var paragraphKey = 0
    var paragraphs = this.state.paragraphs.map(function(verseNumbers){
      return (
        <Paragraph
            key={'paragraph-'+paragraphKey++}
            book={this.props.params.book}
            chapter={this.props.params.chapter}
            verseNumbers={verseNumbers}
            verses={this.state.verses} />
      )
    }.bind(this)).toArray()

    return (
      <article className="bible-chapter">
        <div className="bible-paragraphs">
          {paragraphs}
        </div>
        <this.props.activeRouteHandler />
      </article>
    )
  }
})
