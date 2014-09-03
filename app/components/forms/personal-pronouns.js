/** @jsx React.DOM */

var React = require('react')
var FirstPersonPersonalPronouns = require('./personal-pronouns/first-person')
var SecondPersonPersonalPronouns = require('./personal-pronouns/second-person')
var ThirdPersonPersonalPronouns = require('./personal-pronouns/third-person')

module.exports = React.createClass({
  displayName: 'PersonalPronouns',

  propTypes: {
    forms: React.PropTypes.any.isRequired,
    parseCategories: React.PropTypes.any.isRequired,
    lemma: React.PropTypes.any
  },

  render: function() {
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

