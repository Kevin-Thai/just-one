import React from 'react'
import PropTypes from 'prop-types'

class GuesserBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    events: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      guess: '',
      // stage: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.setGuess = this.setGuess.bind(this)
    this.setWord = this.setWord.bind(this)
    this.skipTurn = this.skipTurn.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  setGuess() {
    this.props.moves.submitGuess(this.state.guess)
    this.setState({
      guess: '',
    })
  }

  skipTurn() {
    this.props.G.guesses[this.props.G.currentWord] = 'incorrect'
    this.props.moves.nextTurn()
  }

  setWord() {
    this.props.moves.setWord()
    // this.setState({ stage: 'guess' })
  }

  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    const guessForm = (
      <div>
        <h4>Your clues are:</h4>
        <ul>
          {Object.keys(this.props.G.clues).map((clue, i) =>
            this.props.G.clues[clue] >= 0 ? (
              <li key={i} className="emphasis">
                {clue}
              </li>
            ) : (
              ''
            )
          )}
        </ul>
        <input type="text" name="guess" value={this.state.guess} onChange={this.handleChange} />
        <button
          onClick={() => this.setGuess()}
          disabled={!this.props.isActive || !this.state.guess}>
          Submit guess
        </button>
        <button onClick={() => this.skipTurn()} disabled={!this.props.isActive}>
          Skip
        </button>
      </div>
    )
    const setWordBtn = (
      <div>
        <button onClick={() => this.setWord()}>Set the random word!</button>
      </div>
    )
    return (
      <div>
        <h2>{stage ? this.props.G.stage[stage] : 'Waiting...'}</h2>
        {stage === 'guess' ? guessForm : ''}
        {stage === 'draw' ? setWordBtn : ''}
      </div>
    )
  }
}

export default GuesserBoard
