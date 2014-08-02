/** @jsx React.DOM */

var React = require('react')
var GreekWord = require('../models/greek-word')
var Immutable = require('immutable')
var unorm = require('unorm')

module.exports = React.createClass({
  propTypes: {
  },

  getInitialState: function() {
    return {
      forms: Immutable.Map(),
      occurences: 0,
      definitions: Immutable.Map()
    }
  },

  componentDidMount: function componentDidMount() {
    // var book = this.props.params.book
    // var number = 1
    GreekWord.findByLemma(unorm.nfd(this.props.params.word),function(err,res) {
      if(err || !res) return

      this.setState({
        forms: res.get('forms') || Immutable.Map(),
        occurences: res.get('occurences'),
        definitions: res.get('definitions') || Immutable.Map()
      })
    }.bind(this))
  },

  render: function () {
    return (
      <div className="bible-word-info">
        <div className="bible-word-info-inner">
          Word: {this.props.params.word}<br />
          Forms: {this.state.forms.length}<br />
          Occurences: {this.state.occurences}<br />

          <h2>Definition</h2>
          <p>{this.state.definitions.get('mounce')} (Mounce)</p>
        </div>
      </div>
    )
  }
})
