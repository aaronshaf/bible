/** @jsx React.DOM */

var React = require('react')
var ChapterModel = require('../models/chapter')
var GreekWordModel = require('../models/greek-word')
var Immutable = require('immutable')
var Parsing = require('../utils/parsing')
require('array.prototype.find')

module.exports = React.createClass({
  propTypes: {},

  getInitialState: function() {
    return {
      forms: Immutable.Map(),
      occurences: 0,
      definitions: Immutable.Map(),
      wordData: Immutable.Map(),
      lemma: "",
      partOfSpeech: "",
      partOfSpeechCode: "",
      parsingCode: ""
    }
  },

  componentDidMount: function componentDidMount() {
    var book = this.props.params.book
    var chapterNumber = this.props.params.chapter

    ChapterModel.findByBookAndChapterNumber(book,chapterNumber,function(err,res) {
      if(err || !res) return

      // debugger

      var wordData = res
        .get('verses')
        .get(this.props.params.verse - 1)
        .get(this.props.params.wordIndex - 1)

      this.setState({
        wordData: wordData,
        partOfSpeech: Parsing.partsOfSpeech.find(function(partOfSpeech) {
          return partOfSpeech.code === wordData.get(0)
        }),
        partOfSpeechCode: wordData.get(0),
        parsingCode: wordData.get(1),
        lemma: wordData.get(5)
      })
    }.bind(this))

    GreekWordModel.findByLemma(this.props.params.word,function(err,res) {
      if(err) return

      this.setState({
        forms: res.get('forms') || Immutable.Map(),
        occurences: res.get('occurences'),
        definitions: res.get('definitions') || Immutable.Map()
      })
    }.bind(this))
  },

  render: function () {
    var parsingCategories = Parsing.categories.map(function(category) {
      return (
        <div className="parsingCategory">
          <div className="parsingCategoryLabel">{category.label}</div>
          <div className="parsingCategoryValue">{category.options[0]}</div>
        </div>
      )
    })

    var definition = null
    if(this.state.definitions.get('mounce')) {
      definition = (
        <p className="bible-word-info-definition">
          {this.state.definitions.get('mounce')} (Mounce)
        </p>
      )
    }

    var occurences = null
    if(this.state.occurences) {
      occurences = <span>({this.state.occurences})</span>
    }

    return (
      <div className="bible-word-info">
        <div className="bible-word-info-inner">
          <h1>{this.state.lemma} {occurences}</h1>

          {definition}

          <div className="parsingCategories">
            <div className="parsingCategory">
              <div className="parsingCategoryLabel">
                Part of speech
              </div>
              <div className="parsingCategoryValue">
                {this.state.partOfSpeech.label}
              </div>
            </div>

            {parsingCategories}
          </div>

          Forms: {this.state.forms.length}
        </div>
      </div>
    )
  }
})
