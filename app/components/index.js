/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

module.exports = React.createClass({
  componentDidMount: function componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },

  handleKeyDown: function(event) {
    if(event.shiftKey && event.which === 39) { '→'
      Router.transitionTo('/matthew/1')
    }
  },

  render: function render() {
    return (
      <section className="bible-main-right-section">
        <div className="bible-keyboard-instructions">
          <div className="bible-keyboard-instructions-inner">
            <div>
              <div className="bible-keyboard-instructions-key">shift</div>
              +
              <div className="bible-keyboard-instructions-key">alt</div>
              +
              <div className="bible-keyboard-instructions-key">←</div>
              Previous book
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">shift</div>
              +
              <div className="bible-keyboard-instructions-key">←</div>
              Previous chapter
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">shift</div>
              +
              <div className="bible-keyboard-instructions-key">→</div>
              Next chapter
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">shift</div>
              +
              <div className="bible-keyboard-instructions-key">alt</div>
              +
              <div className="bible-keyboard-instructions-key">→</div>
              Next book
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">esc</div>
              Back to current chapter
            </div>
          </div>
        </div>
      </section>
    )
  }
})
