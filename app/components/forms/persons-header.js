/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')

module.exports = React.createClass({
  render: function() {
    var personLabels = Parsing.get('person').get('options').toArray().map(function(person) {
      return (
        <th>{person.get('label')}</th>
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
