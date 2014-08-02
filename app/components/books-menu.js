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
          <Link to="book" book={book.osisID}>
            {book.names.english}
          </Link>
        </li>
      )
    })

    return (
      <ol className="bible-books-menu">
        {books}
      </ol>
    )
  }
})
