/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
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
          </div>
        </div>
      </section>
    )
  }
})
