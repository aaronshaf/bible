/** @jsx React.DOM */
//
var React = require('react')
var Parsing = require('../../utils/parsing')
var NumbersHeader = require('./numbers-header')

module.exports = React.createClass({
  displayName: 'Nouns',

  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired
  },

  render: function() {
    if(!this.props.forms || !this.props.forms.get) return null

    var cases = Parsing.get('case').get('options').map(function(_case) {
      var hasMorphsInCase = false

      var numbers = Parsing.get('number').get('options').map(function(number) {
        var morphs = {}

        Parsing.get('gender').get('options').forEach(function(gender) {
          var formCode = 'N-----' + _case.get('code') + number.get('code') + gender.get('code') + '-'
          var form = this.props.forms.get(formCode)
          if(!form || !form.get) return null
          var text = form.get('morph')
          if(!morphs[text]) {
            morphs[text] = {
              numberOfReferences: 0
            }
          }
          morphs[text].numberOfReferences += this.props.forms.get(formCode).get('references').length
        }.bind(this))

        // Later: use "for of"
        morphs = Object.keys(morphs).map(function(text) {
          return (
            <div key={text}>
              <span>{text} </span>
              <span className="bible-reference-count">
                ({morphs[text].numberOfReferences})
              </span>
            </div>
          )
        })

        if(!morphs.length) return <td key={number.get('label')}></td>
        hasMorphsInCase = true

        var className = ''
        if(this.props.parseCategories && this.props.parseCategories.length) {
          var sameNumber = this.props.parseCategories.get('number') && this.props.parseCategories.get('number').get('code') === number.get('code')
          var sameCase = this.props.parseCategories.get('case') && this.props.parseCategories.get('case').get('code') === _case.get('code')

          if(sameNumber && sameCase) {
            className = 'bible-form-highlighted'
          }
        }

        return (
          <td key={number.get('code')} className={className}>
            {morphs}
          </td>
        )
      }.bind(this)).toArray()

      if(_case.get('label') === 'Vocative' && !hasMorphsInCase) {
        return null
      }

      return (
        <tr key={_case.get('code')}>
          <th>{_case.get('label')}</th>
          {numbers}
        </tr>
      )
    }.bind(this)).toArray()

    return (
      <div className="bible-paradigms">
        <table>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>Noun</span>
            </h2>
          </caption>
          <NumbersHeader />
          {cases}
        </table>
      </div>
    )
  }
})
