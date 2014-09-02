/** @jsx React.DOM */

var React = require('react')
var Parsing = require('../../utils/parsing')
var FirstPersonPersonalPronouns = require('./personal-pronouns/first-person')
var SecondPersonPersonalPronouns = require('./personal-pronouns/second-person')
var ThirdPersonPersonalPronouns = require('./personal-pronouns/third-person')

module.exports = React.createClass({
  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired,
    lemma: React.PropTypes.any
  },

  render: function() {
    var persons = Parsing.get('person').get('options').map(function(person) {
      
      return (
        <table>
          <caption className="bible-panel-heading bible-morph-category">
            <h2>
              <span>{person.get('label')} personal pronouns</span>
            </h2>
          </caption>
          
        </table>
      )
    }.bind(this)).toArray()

    return (
      <div className="bible-paradigms">
        <FirstPersonPersonalPronouns
          forms={this.props.forms}
          parseCategories={this.props.parseCategories}
          lemma={this.props.lemma} />

        <SecondPersonPersonalPronouns
          forms={this.props.forms}
          parseCategories={this.props.parseCategories}
          lemma={this.props.lemma} />
        
        <ThirdPersonPersonalPronouns
          forms={this.props.forms}
          parseCategories={this.props.parseCategories}
          lemma={this.props.lemma} />
      </div>
    )
  }
})

