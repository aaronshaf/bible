/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../../utils/parsing')
var cases = Parsing.get('case').get('options')
var numbers = Parsing.get('number').get('options')
var genders = Parsing.get('gender').get('options')
var Immutable = require('immutable')
var GendersHeader = require('../genders-header')
var GreekWordModel = require('../../../models/greek-word')

module.exports = React.createClass({
  displayName: 'ThirdPersonPersonalPronouns',

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
    GreekWordModel.findByLemma('αὐτός',function(err,res) {
      if(err) return

      this.setState({
        forms: res.get('forms') || Immutable.Map(),
        occurrences: res.get('occurrences'),
        definitions: res.get('definitions') || Immutable.Map()
      })
    }.bind(this))
  },

  render: function() {
    // var sameLemma = this.props.lemma === 'αὐτός'

    if(!this.props.parseCategories) return null

    var numberTables = numbers.map(function(number) {
      var caseRows = cases.map(function(_case) {
        var cells = genders.map(function(gender) {
          var formCode = 'RP----' + _case.get('code') + number.get('code') + gender.get('code') + '-'
          var form = this.state.forms.get(formCode)
          if(!form || !form.get) return <td></td>
          var morph = form.get('morph')

          var sameNumber = this.props.parseCategories.get('number').get('code') === number.get('code')
          var sameCase = this.props.parseCategories.get('case').get('code') === _case.get('code')
          var sameGender =  this.props.parseCategories.get('gender') && this.props.parseCategories.get('gender').get('code') === gender.get('code')

          var className = ''
          if(sameNumber && sameCase && sameGender) {
            className = 'bible-form-highlighted'
          }

          return (
            <td className={className}>
              {morph}
              <span className="bible-reference-count"> ({form.get("references").length})</span>            
            </td>
          )
        }.bind(this)).toArray()

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
              <span>3rd person {number.get('label').toLowerCase()} personal pronouns</span>
            </h2>
          </caption>
          <GendersHeader />
          <tbody>
            {caseRows}
          </tbody>
        </table>
      )
    }.bind(this)).toArray()

    return (
      <div>
        {numberTables}
      </div>
    )
  }
})




