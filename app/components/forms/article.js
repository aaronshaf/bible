/** @jsx React.DOM */
//
var React = require('react')
var Parsing = require('../../utils/parsing')
var PersonsHeader = require('./persons-header')

module.exports = React.createClass({
  render: function() {
    var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
      var cases = Parsing.get('case').get('options').toArray().map(function(_case) {
        if(_case.get('label') === 'Vocative') return
        var forms = Parsing.get('gender').get('options').toArray().map(function(gender) {
          var formCode = 'RA----' + _case.get('code') + number.get('code') + gender.get('code') + '-'
          var form = this.props.forms.get(formCode).get('morph')
          
          return (
            <td>
              {form}
            </td>
          )
        }.bind(this))

        return (
          <tr>
            <th>{_case.get('label')}</th>
            {forms}
          </tr>
        )
      }.bind(this))
      return (
        <table>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>{number.get('label')} articles</span>
            </h2>
          </caption>
          <PersonsHeader />
          {cases}
        </table>
      )
    }.bind(this))

    return (
      <div className="bible-paradigms">{numbers}</div>
    )
  }
})
