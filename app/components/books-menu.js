/** @jsx React.DOM */

var React = require('react')
var Book = require('../models/book')
var Immutable = require('immutable')
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      books: Immutable.Vector()
    }
  },

  componentDidMount: function componentDidMount() {
    this.req = Book.findAll(function(err,res) {
      this.setState({
        books: res.get('books')
      })
    }.bind(this))
  },

  render: function render() {
    var books = this.state.books.toArray().map(function(book) {
      return (
        <li key={'bible-books-menu-' + book.get('osisID')}>
          <Link to="chapter" book={book.get('path')} chapter="1">
            {book.get('names').get('english')}
          </Link>
        </li>
      )
    })

    return (
      <nav className="bible-books-menu">
        <ol className="bible-books-menu-list">
          {books}
        </ol>
      </nav>
    )
  }
})
