/** @jsx React.DOM */

var React = require('react')
var Book = require('../models/book')
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      books: []
    }
  },

  componentDidMount: function componentDidMount() {
    this.req = Book.findAll(function(err,res) {
      this.setState({
        books: res.books
      })
    }.bind(this))
  },

  render: function render() {
    var books = this.state.books.map(function(book) {
      return (
        <li key={'bible-books-menu-' + book.osisID}>
          <Link to="chapter" book={book.osisID} chapter="1">
            {book.names.english}
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
