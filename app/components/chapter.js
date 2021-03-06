/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Paragraph = require('./paragraph')
var Immutable = require('immutable')
var BookModel = require('../models/book')
var ChapterModel = require('../models/chapter')
var TrackedRoute = require('../common/tracked-route')

module.exports = React.createClass({
  // propTypes: {
  //   book: React.PropTypes.any.isRequired,
  //   chapter: React.PropTypes.any.isRequired,
  //   paragraphs: React.PropTypes.any.isRequired,
  //   verses: React.PropTypes.any.isRequired
  // }
  
  mixins: [ TrackedRoute ],

  getInitialState: function() {
    return {
      verses: Immutable.Vector(),
      paragraphs: Immutable.Vector(),
      unloadedVerses: Immutable.Vector(),
      versesLoaded: 0
    }
  },

  loadMoreVerses: function() {
    setTimeout(function() {
      if(!this.state.unloadedVerses.length || !this.isMounted()) return
      this.setState({
        verses: this.state.verses.toVector().concat(this.state.unloadedVerses.slice(0,6)),
        unloadedVerses: this.state.unloadedVerses.slice(6)
      }, function() {
        if(this.state.unloadedVerses.length) {
          this.loadMoreVerses()
        }
      }.bind(this))
    }.bind(this),1)
  },

  componentDidMount: function componentDidMount() {
    var book = BookModel.findByPath(this.props.params.book)
    var bookOsisId = book.get('osisID')
    var chapterNumber = this.props.params.chapter

    document.title = book.get('shortNames').get('english') + ' ' + chapterNumber

    ChapterModel.findByBookAndChapterNumber(bookOsisId,chapterNumber,function(err,res) {
      if(err || !this.isMounted()) return
      this.setState({
        paragraphs: res.get('paragraphs'),
        unloadedVerses: res.get('verses').slice(3),
        verses: res.get('verses').slice(0,3)
      }, function() {
        this.loadMoreVerses()
      }.bind(this))

      this.preloadPreviousChapter()
      this.preloadNextChapter()
    }.bind(this))

    window.addEventListener('keydown', this.handleKeyDown)
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },

  handleKeyDown: function(event) {
    var secondaryKeyPressed = event.altGraphKey || event.altKey ||
        event.ctrlKey || event.metaKey || event.shiftKey

    if(!secondaryKeyPressed && event.which === 72) { // h
      return this.transitionToPreviousChapter()
    }

    if(!secondaryKeyPressed && event.which === 74) { // j
      return this.transitionToPreviousWord()
    }

    if(!secondaryKeyPressed && event.which === 75) { // k
      return this.transitionToNextWord()
    }

    if(!secondaryKeyPressed && event.which === 76) { // l
      return this.transitionToNextChapter()
    }

    if(event.which === 27) { // esc
      return this.transitionToCurrentChapter()
    }
  },

  preloadPreviousChapter: function() {
    var book = BookModel.findByPath(this.props.params.book)
    var chapterNumber = this.props.params.chapter
    var result = BookModel.findPreviousChapter(book,chapterNumber)

    ChapterModel.findByBookAndChapterNumber(
      result.get('book').get('osisID'),
      result.get('chapter'),
      function(){}
    )
  },

  preloadNextChapter: function() {
    var book = BookModel.findByPath(this.props.params.book)
    var chapterNumber = this.props.params.chapter
    var result = BookModel.findNextChapter(book,chapterNumber)

    ChapterModel.findByBookAndChapterNumber(
      result.get('book').get('osisID'),
      result.get('chapter'),
      function(){}
    )
  },

  transitionToPreviousWord: function() {
    // TODO: Refactor to not access the DOM?
    var activeWord = document.querySelector('.bible-word.active')
    if(activeWord) {
      activeWord.classList.remove('active')
    }
    var allWords = document.querySelectorAll('.bible-word')
    var index = Array.prototype.indexOf.call(allWords,activeWord)
    if(index > 0) {
      allWords[index - 1].click()
      allWords[index - 1].classList.add('active')
    }

    if(index > 1) {
      var event = document.createEvent('Event')
      event.initEvent('mouseover', true, true)
      allWords[index - 2].dispatchEvent(event)
    }
  },

  transitionToNextWord: function() {
    // TODO: Refactor to not access the DOM?
    var activeWord = document.querySelector('.bible-word.active')
    if(activeWord) {
      activeWord.classList.remove('active')
    }
    var allWords = document.querySelectorAll('.bible-word')
    var index = Array.prototype.indexOf.call(allWords,activeWord)
    if(index < allWords.length - 1) {
      allWords[index + 1].click()
      allWords[index + 1].classList.add('active')
    }

    if(index < allWords.length - 2) {
      var event = document.createEvent('Event')
      event.initEvent('mouseover', true, true)
      allWords[index + 2].dispatchEvent(event)
    }
  },

  transitionToCurrentChapter: function() {
    Router.transitionTo(
      'chapter', {
        book: this.props.params.book,
        chapter: this.props.params.chapter
      }
    )

    return false
  },

  transitionToPreviousChapter: function() {
    var book = BookModel.findByPath(this.props.params.book)
    var chapterNumber = this.props.params.chapter

    var result = BookModel.findPreviousChapter(book,chapterNumber)
    Router.transitionTo(
      'chapter', {
        book: result.get('book').get('path'),
        chapter: result.get('chapter')
      }
    )

    return false
  },

  transitionToPreviousBook: function() {
    var book = BookModel.findByPath(this.props.params.book)

    var result = BookModel.findPreviousBook(book)
    Router.transitionTo(
      'chapter', {
        book: result.get('book').get('path'),
        chapter: 1
      }
    )

    return false
  },

  transitionToNextChapter: function() {
    var book = BookModel.findByPath(this.props.params.book)
    var chapterNumber = this.props.params.chapter

    var result = BookModel.findNextChapter(book,chapterNumber)
    Router.transitionTo(
      'chapter', {
        book: result.get('book').get('path'),
        chapter: result.get('chapter')
      }
    )

    return false
  },

  transitionToNextBook: function() {
    var book = BookModel.findByPath(this.props.params.book)

    var result = BookModel.findNextBook(book)
    Router.transitionTo(
      'chapter', {
        book: result.get('book').get('path'),
        chapter: 1
      }
    )

    return false
  },

  render: function render() {
    var paragraphKey = 0
    if(!this.state.paragraphs) return null
    var paragraphs = this.state.paragraphs.map(function(verseNumbers) {
      var verses = verseNumbers
        .filter(function(verseNumber) {
          return this.state.verses.get(verseNumber - 1)
        }.bind(this))
        .map(function(verseNumber) {
          return Immutable.Map({
            number: verseNumber,
            words: this.state.verses.get(verseNumber - 1)
          })
        }.bind(this)).toVector()

      return (
        <Paragraph
          key={'paragraph-' + paragraphKey++}
          book={this.props.params.book}
          chapter={this.props.params.chapter}
          verses={verses}
        />
      )
    }.bind(this)).toArray()

    var upArrow
    if(this.props.params.book !== 'matthew' || this.props.params.chapter !== '1') {
      upArrow = (
        <div className="bible-previous">
          <a href="#" onClick={this.transitionToPreviousChapter}>
            <img src="/img/arrow-up.svg" className="bible-previous-icon" />
          </a>
        </div>
      )
    }

    var downArrow
    if(this.state.paragraphs.length && !this.state.unloadedVerses.length) {
      downArrow = (
        <div className="bible-next">
          <a className="bible-next-link" href="#" onClick={this.transitionToNextChapter}>
            <img src="/img/arrow-down.svg" className="bible-next-icon" />
          </a>
        </div>
      )
    }

    var loading
    if(!this.state.paragraphs.length) {
      loading = (
        <div className="bible-chapter-container">
          <img src="/img/loading-spinning-bubbles.svg" className="bible-loading" />
        </div>
      )
    }

    return (
      <section className="bible-chapter-container">
        <article className="bible-chapter">
          {upArrow}

          {loading}

          {paragraphs}

          {downArrow}
        </article>
        <this.props.activeRouteHandler />
      </section>
    )
  }
})
