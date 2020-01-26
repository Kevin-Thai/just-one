import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ValidationForm from './ValidationForm'
import ClueForm from './ClueForm'

class ClueBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    events: PropTypes.any.isRequired,
  }

  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    return (
      <div>
        <h2>{stage ? this.props.G.stage[stage] : 'Waiting...'}</h2>
        <div>
          {this.props.G.currentWord ? (
            <h3>
              The secret word is: <span className="emphasis">{this.props.G.currentWord}</span>
            </h3>
          ) : (
            ''
          )}
        </div>
        {stage === 'clue' ? <ClueForm {...this.props} /> : ''}
        {stage === 'validate' ? <ValidationForm {...this.props} /> : ''}
      </div>
    )
  }
}

export default ClueBoard
