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
    var secondaryKeyPressed = event.altGraphKey || event.altKey ||
        event.ctrlKey || event.metaKey || event.shiftKey

    if(secondaryKeyPressed && (event.which === 75 || event.which === 76)) { // 'k' or 'l'
      Router.transitionTo('/matthew/1')
    }
  },

  render: function render() {
    return (
      <section className="bible-main-right-section">
        <div className="bible-keyboard-instructions">
          <div className="bible-keyboard-instructions-inner">
            <div>
              <div className="bible-keyboard-instructions-key">h</div>
              Previous book
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">j</div>
              Previous chapter
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">k</div>
              Next chapter
            </div>

            <div>
              <div className="bible-keyboard-instructions-key">l</div>
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
