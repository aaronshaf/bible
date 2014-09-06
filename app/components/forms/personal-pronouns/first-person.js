/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../../utils/parsing')
var cases = Parsing.get('case').get('options')
var numbers = Parsing.get('number').get('options')
var Immutable = require('immutable')
var NumbersHeader = require('../numbers-header')
var GreekWordModel = require('../../../models/greek-word')

module.exports = React.createClass({
  displayName: 'FirstPersonPersonalPronouns',

  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired,
    lemma: React.PropTypes.any.isRequired
  },

  getInitialState: function() {
    return {
      forms: Immutable.Map()
    }
  },

  componentDidMount: function() {
    GreekWordModel.findByLemma('ἐγώ',function(err,res) {
      if(err || !this.isMounted()) return

      this.setState({
        forms: res.get('forms') || Immutable.Map(),
        occurrences: res.get('occurrences'),
        definitions: res.get('definitions') || Immutable.Map()
      })
    }.bind(this))
  },

  render: function() {
    var sameLemma = this.props.lemma === 'ἐγώ'

    var caseRows = cases.map(function(_case) {
      var hasMorphsInCase = false
      var cells = numbers.map(function(number) {
        var formCode = 'RP----' + _case.get('code') + number.get('code') + '--'
        var form = this.state.forms.get(formCode)
        if(!form || !form.get) return <td></td>
        hasMorphsInCase = true
        var morph = form.get('morph')

        var sameNumber = this.props.parseCategories.get('number').get('code') === number.get('code')
        var sameCase = this.props.parseCategories.get('case').get('code') === _case.get('code')

        var className = ''
        if(sameNumber && sameCase && sameLemma) {
          className = 'bible-form-highlighted'
        }

        return (
          <td className={className}>
            {morph}
            <span className="bible-reference-count"> ({form.get("references").length})</span>
          </td>
        )
      }.bind(this)).toArray()

      if(_case.get('label') === 'Vocative' && !hasMorphsInCase) {
        return null
      }
      
      return (
        <tr>
          <th>{_case.get('label')}</th>
          {cells} 
        </tr>
      )
    }.bind(this)).toArray()

    return (
      <table>
        <caption className="bible-panel-heading bible-morph-category">
          <h2>
            <span>1st person personal pronouns</span>
          </h2>
        </caption>
        <NumbersHeader />
        <tbody>
          {caseRows}
        </tbody>
      </table>
    )
  }
})


