/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../../utils/parsing')

module.exports = React.createClass({
  displayName: 'VoicesHeader',

  render: function() {
    var voiceLabels = Parsing.get('voice').get('options').toArray().map(function(voice) {
      return (
        <th key={voice.get('label')}>{voice.get('label')}</th>
      )
    })

    return (
      <thead>
        <tr>
          <th></th>
          {voiceLabels}
        </tr>
      </thead>
    )
  }
})

