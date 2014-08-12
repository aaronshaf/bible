/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')
var PersonsHeader = require('./persons-header')

module.exports = React.createClass({
  render: function() {
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

              return (
                <td>{form} {referenceCountLabel}</td>
              )
            }.bind(this))

            return (
              <tr>
                <th>{tense.get('label')}</th>
                {forms}
              </tr>
            )
          }.bind(this))

          if(!numberOfReferencesInGrammaticalNumber) return

          return (
            <div>
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
          <div>
            {numbers}
          </div>
        )
      }.bind(this))
      return (
        <div>
          {voices}
        </div>
      )
    }.bind(this))

    return (
      <div className="bible-paradigms">{moods}</div>
    )
  }
})
