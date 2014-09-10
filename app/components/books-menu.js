/** @jsx React.DOM */

var React = require('react')
var BookModel = require('../models/book')
var ChapterModel = require('../models/chapter')
var Immutable = require('immutable')
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      books: Immutable.Vector()
    }
  },

  handleLinkMouseEnter: function(book) {
    ChapterModel.findByBookAndChapterNumber(book.get('osisID'),1,function(){})
  },

  render: function render() {
    var books = BookModel.findAll().toArray().map(function(book) {
      var params = {
        book: book.get('path'),
        chapter: "1"
      }
      var className = this.props.activeBookPath === book.get('path') ? 'active' : ''

      return (
        <li key={'bible-books-menu-' + book.get('osisID')}>
          <Link to="chapter"
              params={params}
              onMouseEnter={this.handleLinkMouseEnter.bind(null,book)}
              title={book.get('names').get('english')}
              className={className}
              >
            {book.get('shortNames').get('english')}
          </Link>
        </li>
      )
    }.bind(this))

    return (
      <nav className="bible-books-menu">
        <ol className="bible-books-menu-list">
          {books}
        </ol>
      </nav>
    )
  }
})
