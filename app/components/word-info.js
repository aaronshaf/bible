/** @jsx React.DOM */

var React = require('react')
var BookModel = require('../models/book')
var ChapterModel = require('../models/chapter')
var GreekWordModel = require('../models/greek-word')
var Immutable = require('immutable')
var Parsing = require('../utils/parsing')
var VerbForms = require('./forms/verb')
var NounForms = require('./forms/nouns')
var Article = require('./forms/article')
var AdjectiveForms = require('./forms/adjective')
var RelativePronoun = require('./forms/relative-pronoun')
var DemonstrativePronoun = require('./forms/demonstrative-pronoun')
var morphCodesToCategories = require('../utils/morph-codes-to-categories')

require('array.prototype.find')

module.exports = React.createClass({
  propTypes: {},

  getInitialState: function() {
    return {
      forms: Immutable.Map(),
      occurences: 0,
      definitions: Immutable.Map(),
      wordData: Immutable.Map(),
      parseCategories: Immutable.Map(),
      partOfSpeech: Immutable.Map(),
      textIncludingPunctuation: '',
      wordWithPunctuationStripped: '',
      normalizedWord: '',
      lemma: ''
    }
  },

  componentDidMount: function componentDidMount() {
    var book = BookModel.findByPath(this.props.params.book)
    var bookOsisId = book.get('osisID')
    var chapterNumber = this.props.params.chapter

    ChapterModel.findByBookAndChapterNumber(bookOsisId,chapterNumber,function(err,res) {
      if(err || !res) return

      var wordData = res
        .get('verses')
        .get(this.props.params.verse - 1)
        .get(this.props.params.wordIndex - 1)

      this.setState({
        wordData: wordData,
        partOfSpeech: Parsing.get('partOfSpeech').get('options').find(function(partOfSpeech) {
          return partOfSpeech.get('code') === wordData.get(0)
        }),
        parseCategories: morphCodesToCategories(wordData.get(1)),
        // textIncludingPunctuation: wordData.get(2),
        // wordWithPunctuationStripped: wordData.get(3),
        // normalizedWord: wordData.get(4),
        lemma: wordData.get(5)
      }, function() {
        GreekWordModel.findByLemma(wordData.get(5),function(err,res) {
          if(err) return

          this.setState({
            forms: res.get('forms') || Immutable.Map(),
            occurences: res.get('occurences'),
            definitions: res.get('definitions') || Immutable.Map()
          })
        }.bind(this))
      }.bind(this))
    }.bind(this))
  },

  render: function () {
    if(!this.state.partOfSpeech) {
      return null
    }
    var parsingCategories = Parsing.map(function(category,key) {
      var value
      if(!this.state.parseCategories.length
          || !this.state.parseCategories.get(key)) {
        return null
      }
      value = this.state.parseCategories.get(key).get('label')
      return (
        <tr key={category.get('label')}>
          <th>
            {category.get('label')}
          </th>
          <td>
            {value}
          </td>
        </tr>
      )
    }.bind(this)).toVector().toArray()

    var occurences = null
    if(this.state.occurences) {
      occurences = <span>({this.state.occurences})</span>
    }

    var definition = null
    if(this.state.definitions.get('mounce')) {
      definition = (
        <table className="bible-definition">
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              {this.state.lemma} {occurences}
            </h2>
          </caption>
          <tbody>
            <tr>
              <td>
                <p className="bible-word-info-definition">
                  {this.state.definitions.get('mounce')} (Mounce)
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    var paradigms
    if(this.state.partOfSpeech.get('label') === 'Noun' &&
        this.state.forms.length) {
      paradigms = (
        <NounForms
            forms={this.state.forms}
            parseCategories={this.state.parseCategories} />
      )
    } else if (this.state.partOfSpeech.get('label') === 'Verb' &&
        this.state.forms.length) {
      paradigms = (
        <VerbForms
            forms={this.state.forms}
            parseCategories={this.state.parseCategories} />
      )
    } else if (this.state.partOfSpeech.get('label') === 'Article') {
      paradigms = (
        <Article
            forms={this.state.forms}
            parseCategories={this.state.parseCategories} />
      )
    } else if (this.state.partOfSpeech.get('label') === 'Adjective') {
      paradigms = (
        <AdjectiveForms
            forms={this.state.forms}
            parseCategories={this.state.parseCategories} />
      )
    } else if (this.state.partOfSpeech.get('label') === 'Relative Pronoun') {
      paradigms = (
        <RelativePronoun
            forms={this.state.forms}
            parseCategories={this.state.parseCategories} />
      )
    } else if (this.state.partOfSpeech.get('label') === 'Demonstrative Pronoun') {
      paradigms = (
        <DemonstrativePronoun
            forms={this.state.forms}
            parseCategories={this.state.parseCategories} />
      )
    }

    var morphology
    if(this.state.partOfSpeech.get('label') && this.state.partOfSpeech.get('label') !== 'Article') {
      morphology = (
        <table>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              Morphology {/* this.state.wordData.get(1) */}
            </h2>
          </caption>
          <tbody>
            <tr>
              <th>
                Part of speech
              </th>
              <td>
                {this.state.partOfSpeech.get('label')}
              </td>
            </tr>
            {parsingCategories}
          </tbody>
        </table>
      )
    }

    return (
      <div className="bible-word-info">
        <div className="bible-word-info-inner">

          {definition}

          {morphology}

          {paradigms}
        </div>
      </div>
    )
  }
})
