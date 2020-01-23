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
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    this.props.moves.submitGuess(this.state.guess)
  }

  render() {
    const guessForm = (
      <div>
        <input type="text" name="guess" value={this.state.guess} onChange={this.handleChange} />
        <button onClick={() => this.handleSubmit()} disabled={!this.state.guess}>
          Submit guess
        </button>
      </div>
    )
    return <div>{guessForm}</div>
  }
}

export default GuesserBoard
