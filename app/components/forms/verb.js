/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')
var PersonsHeader = require('./persons-header')
var GendersHeader = require('./genders-header')
var VoicesHeader = require('./headers/voices')
var Immutable = require('immutable')

module.exports = React.createClass({
  displayName: 'Verbs',

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
                var sameMood = this.props.parseCategories.get('mood') && this.props.parseCategories.get('mood').get('code') === mood.get('code')
                var sameVoice = this.props.parseCategories.get('voice') && this.props.parseCategories.get('voice').get('code') === voice.get('code')
                var sameNumber = this.props.parseCategories.get('number') && this.props.parseCategories.get('number').get('code') === number.get('code')
                var sameTense = this.props.parseCategories.get('tense') && this.props.parseCategories.get('tense').get('code') === tense.get('code')
                var samePerson = this.props.parseCategories.get('person') && this.props.parseCategories.get('person').get('code') === person.get('code')

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
      var voices = Parsing.get('voice').get('options').toArray().map(function(voice) {
        var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
          var numberOfReferencesInGrammaticalNumber = 0

          var cases = Parsing.get('case').get('options').toArray().map(function(_case) {
            var hasMorphsInCase = false
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
                hasMorphsInCase = true
              }

              var className = ''
              if(this.props.parseCategories && this.props.parseCategories.length) {
                var sameTense = this.props.parseCategories.get('tense') && this.props.parseCategories.get('tense').get('code') === tense.get('code')
                var sameVoice = this.props.parseCategories.get('voice') && this.props.parseCategories.get('voice').get('code') === voice.get('code')
                var sameNumber = this.props.parseCategories.get('number') && this.props.parseCategories.get('number').get('code') === number.get('code')
                var sameCase = this.props.parseCategories.get('case') && this.props.parseCategories.get('case').get('code') === _case.get('code')
                var sameGender = this.props.parseCategories.get('gender') && this.props.parseCategories.get('gender').get('code') === gender.get('code')

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

            if(_case.get('label') === 'Vocative' && !hasMorphsInCase) {
              return null
            }

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

    var numberOfInfinitiveForms = 0
    var infinitiveTenses = Parsing.get('tense').get('options').toArray().map(function(tense) {
      var whitelist = ['Present','Aorist','Perfect','Future']
      if(whitelist.indexOf(tense.get('label')) === -1) {
        return null
      }

      var numberOfReferencesInTense = 0
      
      var voices = Parsing.get('voice').get('options').toArray().map(function(voice) {
        var formCode = 'V-' + '-' + tense.get('code') + voice.get('code') + 'N----'

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
          numberOfReferencesInTense += numberOfReferences
          numberOfInfinitiveForms += numberOfReferences
        }

        var className = ''
        if(this.props.parseCategories && this.props.parseCategories.length) {
          var sameVoice = this.props.parseCategories.get('voice') && this.props.parseCategories.get('voice').get('code') === voice.get('code')
          var sameTense = this.props.parseCategories.get('tense') && this.props.parseCategories.get('tense').get('code') === tense.get('code')
          var sameMood = this.props.parseCategories.get('mood') && this.props.parseCategories.get('mood').get('code') === 'N'

          if(sameVoice && sameTense && sameMood) {
            className = 'bible-form-highlighted'
          }
        }

        return (
          <td key={formCode} className={className}>
            {form} {referenceCountLabel}
          </td>
        )
      }.bind(this))

      if(!numberOfReferencesInTense && tense.get('label') === 'Future') {
        return null
      }

      return (
        <tr>
          <th>{tense.get('label')}</th>
          {voices}
        </tr>
      )
    }.bind(this))

    var infinitives
    if(!numberOfInfinitiveForms) {
      infinitives = null
    } else {
      infinitives = (
        <table>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>Infinitives</span>
            </h2>
          </caption>
          <tbody>
            <VoicesHeader />
            {infinitiveTenses}
          </tbody>
        </table>
      )
    }


    return (
      <div>
        <div className="bible-paradigms">{moods}</div>
        <div className="bible-paradigms">{participles}</div>
        <div className="bible-paradigms">{infinitives}</div>
      </div>
    )
  }
})
