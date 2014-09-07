/** @jsx React.DOM */

var React = require('react')
var chunk = require('chunk')
var adverbs = require('aaronshaf-bible-data/words/sblgnt/json/adverbs.json')

var adverbArray = Object.keys(adverbs).map(function(adverb) {
  return {
    adverb: adverb,
    occurrences: adverbs[adverb].occurrences
  } 
})
var chunkedAdverbs = chunk(adverbArray,4)

module.exports = React.createClass({
  displayName: 'Adverbs',

  propTypes: {
    forms: React.PropTypes.any.isRequired
  },

  renderAdverbCell: function(data) {
    var className = ''
    if(!this.props.forms || !this.props.forms.length) return null
    var morph = this.props.forms.get('D---------').get('morph')
    if(morph === data.adverb) {
      className = 'bible-form-highlighted'
    }
    return (
      <td key={data.adverb} className={className}>
        {data.adverb} 
        <span className="bible-reference-count"> ({data.occurrences})</span>
      </td>
    )
  },

  render: function() {
    if(!this.props.forms || !this.props.forms.get) return null

    var row = 0
    var adverbs = chunkedAdverbs.map(function(chunk) {
      var cells = chunk.map(this.renderAdverbCell)
      return (
        <tr key={row++}>
          {cells}
        </tr>
      )
    }.bind(this))
    
    return (
      <div className="bible-paradigms">
        <table className="bible-adverbs">
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>Adverbs</span>
            </h2>
          </caption>
          <tbody>
            {adverbs}
          </tbody>
        </table>
      </div>
    )
  }
})



