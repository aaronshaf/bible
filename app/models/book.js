var Immutable = require('immutable')

var books = Immutable.fromJS(require('aaronshaf-bible-data/books/index.json'))

exports.findAll = function() {
  // We don't support the OT yet
  var newTestament = books.slice(39)
  return newTestament
}

exports.findByPath = function(path) {
  return books.find(function(book) {
    return book.get('path') === path.toLowerCase()
  })
}

exports.findPreviousChapter = function(book,chapter) {
  var chapterNumber = parseInt(chapter,10)
  var newBook = book
  var newChapter = chapterNumber - 1
  var bookIndex = books.indexOf(book)

  if(newChapter < 1) {
    if(bookIndex > 39) {
      newBook = books.get(bookIndex - 1)
      newChapter = newBook.get('totalChapters')
    }
  }

  if(newChapter < 1) {
      newChapter = 1
  }

  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}

exports.findPreviousBook = function(book) {
  var newBook = book
  var newChapter = 1
  var bookIndex = books.indexOf(book)

  if(bookIndex > 39) {
    newBook = books.get(bookIndex - 1)
  }

  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}

exports.findNextChapter = function(book,chapter) {
  var chapterNumber = parseInt(chapter,10)
  var newBook = book
  var newChapter = chapterNumber + 1
  var bookIndex

  if(newChapter > book.get('totalChapters')) {
    newChapter = 1
    bookIndex = books.indexOf(book)
    if(bookIndex + 1 < books.length) {
      newBook = books.get(bookIndex + 1)
    }
  }
  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}

exports.findNextBook = function(book) {
  var newBook = book
  var newChapter = 1
  var bookIndex = books.indexOf(book)

  if(bookIndex < 65) {
    newBook = books.get(bookIndex + 1)
  }

  return Immutable.Map({
    book: newBook,
    chapter: newChapter
  })
}
