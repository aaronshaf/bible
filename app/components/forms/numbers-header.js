/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')

module.exports = React.createClass({
  displayName: 'NumbersHeader',

  render: function() {
    var numberLabels = Parsing.get('number').get('options').toArray().map(function(number) {
      return (
        <th>{number.get('label')}</th>
      )
    })

    return (
      <thead>
        <tr>
          <th></th>
          {numberLabels}
        </tr>
      </thead>
    )
  }
})
