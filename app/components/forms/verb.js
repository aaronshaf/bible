/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')
var PersonsHeader = require('./persons-header')
var GendersHeader = require('./genders-header')
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
      if(!this.props.parseCategories.get('voice')) return
      if(!this.props.parseCategories.get('person')) return

      var voices = Parsing.get('voice').get('options').toArray().map(function(voice) {
        var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
          var numberOfReferencesInGrammaticalNumber = 0

          var tenses = Parsing.get('tense').get('options').toArray().map(function(tense) {
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

    var participles = Parsing.get('tense').get('options').toArray().map(function(tense) {
      if(!this.props.parseCategories.get('voice')) return
      if(!this.props.parseCategories.get('number')) return
      if(!this.props.parseCategories.get('case')) return
      if(!this.props.parseCategories.get('gender')) return

      var voices = Parsing.get('voice').get('options').toArray().map(function(voice) {
        var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
          var numberOfReferencesInGrammaticalNumber = 0

          var cases = Parsing.get('case').get('options').toArray().map(function(_case) {
            var genders = Parsing.get('gender').get('options').toArray().map(function(gender) {
              var formCode = 'V--' + tense.get('code') + voice.get('code') +
                  'P' + _case.get('code') + number.get('code') +
                  gender.get('code') + '-'

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
                var sameTense = this.props.parseCategories.get('tense').get('code') === tense.get('code')
                var sameVoice = this.props.parseCategories.get('voice').get('code') === voice.get('code')
                var sameNumber = this.props.parseCategories.get('number').get('code') === number.get('code')
                var sameCase = this.props.parseCategories.get('case').get('code') === _case.get('code')
                var sameGender = this.props.parseCategories.get('gender').get('code') === gender.get('code')

                if(sameTense && sameVoice && sameNumber && sameCase && sameGender) {
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
              <tr key={_case.get('label')}>
                <th>{_case.get('label')}</th>
                {genders}
              </tr>
            )
          }.bind(this))

          if(!numberOfReferencesInGrammaticalNumber) return

          return (
            <div key={number.get('label')}>
              <table>
                <caption className="bible-panel-heading bible-morph-category">
                  <h2>
                    <span>Participles: </span>
                    <span>{tense.get('label')} </span>
                    <span>{voice.get('label')} </span>
                    <span>{number.get('label')}</span>
                  </h2>
                </caption>
                <GendersHeader />
                <tbody>
                  {cases}
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
        <div key={tense.get('label')}>
          {voices}
        </div>
      )
    }.bind(this))

    return (
      <div>
        <div className="bible-paradigms">{moods}</div>
        <div className="bible-paradigms">{participles}</div>
      </div>
    )
  }
})
