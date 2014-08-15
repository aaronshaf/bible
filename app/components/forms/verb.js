/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')
var PersonsHeader = require('./persons-header')
var Immutable = require('immutable')

module.exports = React.createClass({
  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    var sameForms = Immutable.is(this.props.forms, nextProps.forms)
    var sameParseCategories = Immutable.is(this.props.parseCategories, nextProps.parseCategories)
    return !sameForms || !sameParseCategories
  },

  render: function() {
    if(!this.props.parseCategories) return null

    var moods = Parsing.get('mood').get('options').toArray().map(function(mood) {
      if(!this.props.parseCategories.get('mood')) return

      var voices = Parsing.get('voice').get('options').toArray().map(function(voice) {
        if(!this.props.parseCategories.get('voice')) return

        var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
          var numberOfReferencesInGrammaticalNumber = 0

          var tenses = Parsing.get('tense').get('options').toArray().map(function(tense) {
            if(!this.props.parseCategories.get('person')) return

            var forms = Parsing.get('person').get('options').toArray().map(function(person) {
              var formCode = 'V-' + person.get('code') + tense.get('code') +
                  voice.get('code') + mood.get('code') + '-' +
                  number.get('code') + '--'

              var form
              var numberOfReferences
              var referenceCountLabel

              if(this.props.forms.get(formCode)) {
                form = this.props.forms.get(formCode).get('morph')
                numberOfReferences = this.props.forms.get(formCode).get('references').length
                referenceCountLabel = (
                  <span className="bible-reference-count">
                    ({numberOfReferences})
                  </span>
                )
                numberOfReferencesInGrammaticalNumber += numberOfReferences
              }

              var className = ''
              if(this.props.parseCategories && this.props.parseCategories.length) {
                var sameMood = this.props.parseCategories.get('mood').get('code') === mood.get('code')
                var sameVoice = this.props.parseCategories.get('voice').get('code') === voice.get('code')
                var sameNumber = this.props.parseCategories.get('number').get('code') === number.get('code')
                var sameTense = this.props.parseCategories.get('tense').get('code') === tense.get('code')
                var samePerson = this.props.parseCategories.get('person').get('code') === person.get('code')

                if(sameMood && sameVoice && sameNumber && sameTense && samePerson) {
                  className = 'bible-form-highlighted'
                }
              }

              return (
                <td key={formCode} className={className}>
                  {form} {referenceCountLabel}
                </td>
              )
            }.bind(this))

            return (
              <tr key={tense.get('label')}>
                <th>{tense.get('label')}</th>
                {forms}
              </tr>
            )
          }.bind(this))

          if(!numberOfReferencesInGrammaticalNumber) return

          return (
            <div key={number.get('label')}>
              <table>
                <caption className="bible-panel-heading bible-morph-category">
                  <h2>
                    <span>{voice.get('label')} </span>
                    <span>{mood.get('label')} </span>
                    <span>{number.get('label')}</span>
                  </h2>
                </caption>
                <PersonsHeader />
                <tbody>
                  {tenses}
                </tbody>
              </table>
            </div>
          )
        }.bind(this))
        return (
          <div key={voice.get('label')}>
            {numbers}
          </div>
        )
      }.bind(this))
      return (
        <div key={mood.get('label')}>
          {voices}
        </div>
      )
    }.bind(this))

    return (
      <div className="bible-paradigms">{moods}</div>
    )
  }
})
