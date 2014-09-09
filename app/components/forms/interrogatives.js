/** @jsx React.DOM */
//
var React = require('react')
var Parsing = require('../../utils/parsing')
var GendersHeader = require('./genders-header')

module.exports = React.createClass({
  displayName: 'Interrogatives',

  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired
  },

  render: function() {
    var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
      var cases = Parsing.get('case').get('options').toArray().map(function(_case) {
        if(_case.get('label') === 'Vocative') return null
        var numbers = Parsing.get('gender').get('options').toArray().map(function(gender) {
          var formCode = 'RI----' + _case.get('code') + number.get('code') + gender.get('code') + '-'        
          var form = this.props.forms.get(formCode)
          if(!form || !form.get) return {
            form: '',
            total: 0,
            highlighted: false
          }

          var sameNumber = this.props.parseCategories.get('number').get('code') === number.get('code')
          var sameCase = this.props.parseCategories.get('case').get('code') === _case.get('code')
          var sameGender = this.props.parseCategories.get('gender').get('code') === gender.get('code')

          return {
            form: form.get('morph'),
            total: form.get('references').length,
            highlighted: sameNumber && sameCase && sameGender
          }
        }.bind(this))
          
        numbers = [
          <td className={numbers[0].highlighted || numbers[1].highlighted ? 'bible-form-highlighted' : ''}>
            {numbers[0].form}
            <span className="bible-reference-count"> ({numbers[0].total + numbers[1].total})</span>
          </td>,
          <td className={numbers[2].highlighted ? 'bible-form-highlighted' : ''}>
            {numbers[2].form}
            <span className="bible-reference-count"> {numbers[2].total ? '(' + numbers[2].total + ')' : ''}</span>
          </td>
        ]

        return (
          <tr>
            <td>{_case.get('label')}</td>
            {numbers}
          </tr>
        )
      }.bind(this))

      return (
        <table>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>{number.get('label')}</span>
            </h2>
          </caption>
          <thead>
            <tr>
              <td></td>
              <td>Masculine/Feminine</td>
              <td>Neuter</td>
            </tr>
            {cases}
          </thead>
        </table>
      )
    }.bind(this))

    return (
      <div className="bible-paradigms">
        {numbers}
      </div>
    )
  }
})

