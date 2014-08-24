/** @jsx React.DOM */
//
var React = require('react')
var Parsing = require('../../utils/parsing')
var GendersHeader = require('./genders-header')

module.exports = React.createClass({
  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired
  },

  render: function() {
    var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
      var cases = Parsing.get('case').get('options').toArray().map(function(_case) {
        var forms = Parsing.get('gender').get('options').toArray().map(function(gender) {
          var formCode = 'A-----' + _case.get('code') + number.get('code') + gender.get('code') + '-'

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
            // numberOfReferencesInGrammaticalNumber += numberOfReferences
          }

          // if(!form || !form.get) return <td></td>

          var className = ''
          if(this.props.parseCategories && this.props.parseCategories.length) {
            var sameNumber = this.props.parseCategories.get('number') && this.props.parseCategories.get('number').get('code') === number.get('code')
            var sameCase = this.props.parseCategories.get('case') && this.props.parseCategories.get('case').get('code') === _case.get('code')
            var sameGender = this.props.parseCategories.get('gender') && this.props.parseCategories.get('gender').get('code') === gender.get('code')

            if(sameNumber && sameCase && sameGender) {
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
          <tr key={_case.get('code')}>
            <th>{_case.get('label')}</th>
            {forms}
          </tr>
        )
      }.bind(this))
      return (
        <table key={number.get('code')}>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>{number.get('label')} adjectives</span>
            </h2>
          </caption>
          <GendersHeader />
          {cases}
        </table>
      )
    }.bind(this))

    return (
      <div className="bible-paradigms">{numbers}</div>
    )
  }
})
