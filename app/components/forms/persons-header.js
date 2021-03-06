/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')

module.exports = React.createClass({
  displayName: 'PersonsHeader',

  render: function() {
    var personLabels = Parsing.get('person').get('options').toArray().map(function(person) {
      return (
        <th key={person.get('label')}>{person.get('label')}</th>
      )
    })
    
    return (
      <thead>
        <tr>
          <th></th>
          {personLabels}
        </tr>
      </thead>
    )
  }
})
