/** @jsx React.DOM */
//
var React = require('react')
var Parsing = require('../../utils/parsing')
var NumbersHeader = require('./numbers-header')

module.exports = React.createClass({
  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired
  },

  render: function() {
    if(!this.props.forms || !this.props.forms.get) return null

    var cases = Parsing.get('case').get('options').toArray().map(function(_case) {
      var numbers = Parsing.get('number').get('options').toArray().map(function(number) {
        var morphs = Parsing.get('gender').get('options').toArray().map(function(gender) {
          var formCode = 'N-----' + _case.get('code') + number.get('code') + gender.get('code') + '-'
          var form = this.props.forms.get(formCode)
          if(!form || !form.get) return null
          return form.get('morph')
        }.bind(this))

        morphs = morphs.filter(function(morph){ return morph !== null })
        if(!morphs.length) return <td></td>

        morphs = morphs.join(', ')

        var sameNumber = this.props.parseCategories.get('number').get('code') === number.get('code')
        var sameCase = this.props.parseCategories.get('case').get('code') === _case.get('code')

        var className = ''
        if(sameNumber && sameCase) {
          className = 'bible-form-highlighted'
        }

        return (
          <td key={number.get('code')} className={className}>
            {morphs}
          </td>
        )
      }.bind(this))

      return (
        <tr key={_case.get('code')}>
          <th>{_case.get('label')}</th>
          {numbers}
        </tr>
      )
    }.bind(this))

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
