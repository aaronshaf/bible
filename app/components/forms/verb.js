/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')
var PersonsHeader = require('./persons-header')

module.exports = React.createClass({
  render: function() {
    var moods = Parsing.get('mood').get('options').toArray().map(function(mood) {
      var voices = Parsing.get('voice').get('options').toArray().map(function(voice) {
        var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
          var tenses = Parsing.get('tense').get('options').toArray().map(function(tense) {
            var forms = Parsing.get('person').get('options').toArray().map(function(person) {
              var formCode = person.get('code') + tense.get('code') +
                  voice.get('code') + mood.get('code') + '-' + number.get('code')
              return (
                <td>{formCode}</td>
              )
            })

            return (
              <tr>
                <th>{tense.get('label')}</th>
                {forms}
              </tr>
            )
          })

          return (
            <div>
              <strong>
                {voice.get('label')}
                {mood.get('label')}
                {number.get('label')}
              </strong>

              <table>
                <PersonsHeader />
                <tbody>
                  {tenses}
                </tbody>
              </table>
            </div>
          )
        })
        return (
          <div>
            {numbers}
          </div>
        )
      })
      return (
        <div>
          {voices}
        </div>
      )
    })

    return (
      <div>{moods}</div>
    )
  }
})
