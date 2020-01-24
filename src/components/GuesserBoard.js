import React from 'react'
import PropTypes from 'prop-types'

class GuesserBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      guess: '',
      stage: 'set',
    }

    this.handleChange = this.handleChange.bind(this)
    this.setGuess = this.setGuess.bind(this)
    this.setWord = this.setWord.bind(this)
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
      stage: 'set',
    })
  }

  setWord() {
    this.props.moves.setWord()
    this.setState({ stage: 'guess' })
  }

  render() {
    // console.log(this.props, 'propsss')

    const guessForm = (
      <div>
        <input type="text" name="guess" value={this.state.guess} onChange={this.handleChange} />
        <button onClick={() => this.setGuess()} disabled={!this.props.isActive}>
          Submit guess
        </button>
      </div>
    )
    const setWordBtn = (
      <div>
        <button onClick={() => this.setWord()}>Set the random word!</button>
      </div>
    )
    return <div>{this.state.stage === 'guess' ? guessForm : setWordBtn}</div>
  }
}

export default GuesserBoard
