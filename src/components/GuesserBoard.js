import React from 'react'
import PropTypes from 'prop-types'
import GuessForm from './GuessForm'

class GuesserBoard extends React.Component {
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
    const setWordBtn = (
      <div>
        <button onClick={() => this.props.moves.setWord()}>
          <span role="img" aria-label="dice">
            🎲
          </span>
        </button>
      </div>
    )
    return (
      <div>
        <h1>You are the guesser!</h1>
        <h2>{stage ? this.props.G.stage[stage] : 'Waiting for your clues...'}</h2>
        {stage === 'guess' ? <GuessForm {...this.props} /> : ''}
        {stage === 'draw' ? setWordBtn : ''}
      </div>
    )
  }
}

export default GuesserBoard
