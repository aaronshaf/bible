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

  componentDidMount: function componentDidMount() {
    var books = BookModel.findAll()
    this.setState({
      books: books
    })
  },

  handleLinkMouseEnter: function(book) {
    ChapterModel.findByBookAndChapterNumber(book.get('osisID'),1,function(){})
  },

  render: function render() {
    var books = this.state.books.toArray().map(function(book) {
      return (
        <li key={'bible-books-menu-' + book.get('osisID')}>
          <Link to="chapter" book={book.get('path')} chapter="1"
              onMouseEnter={this.handleLinkMouseEnter.bind(null,book)}>
            {book.get('names').get('english')}
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
