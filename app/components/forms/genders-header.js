/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')

module.exports = React.createClass({
  displayName: 'GendersHeader',

  render: function() {
    var genderLabels = Parsing.get('gender').get('options').toArray().map(function(gender) {
      return (
        <th key={gender.get('label')}>{gender.get('label')}</th>
      )
    })

    return (
      <thead>
        <tr>
          <th></th>
          {genderLabels}
        </tr>
      </thead>
    )
  }
})
