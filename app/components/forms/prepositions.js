/** @jsx React.DOM */

var React = require('react')
var chunk = require('chunk')
var sortBy = require('lodash-node/modern/collections/sortBy')
var prepositions = require('aaronshaf-bible-data/words/sblgnt/json/prepositions.json')

var prepositionArray = Object.keys(prepositions).map(function(preposition) {
  return {
    preposition: preposition,
    occurrences: prepositions[preposition].occurrences
  } 
})
var sortedPrepositions = prepositionArray.sort(function(a,b) {
  return a.occurrences > b.occurrences ? -1 : 1
})
var chunkedPrepositions = chunk(prepositionArray,4)

module.exports = React.createClass({
  displayName: 'Prepositions',

  propTypes: {
    forms: React.PropTypes.any.isRequired
  },

  renderPrepositionCell: function(data) {
    var className = ''
    if(!this.props.forms || !this.props.forms.length) return null
    var morph = this.props.forms.get('P---------').get('morph')
    if(morph === data.preposition) {
      className = 'bible-form-highlighted'
    }
    return (
      <td className={className}>
        {data.preposition} 
        <span className="bible-reference-count"> ({data.occurrences})</span>
      </td>
    )
  },

  render: function() {
    if(!this.props.forms || !this.props.forms.get) return null

    var prepositions = chunkedPrepositions.map(function(chunk) {
      var cells = chunk.map(this.renderPrepositionCell)
      return (
        <tr>
          {cells}
        </tr>
      )
    }.bind(this))
    
    return (
      <div className="bible-paradigms">
        <table className="bible-prepositions">
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>Prepositions</span>
            </h2>
          </caption>
          <tbody>
            {prepositions}
          </tbody>
        </table>
      </div>
    )
  }
})

