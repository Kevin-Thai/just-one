import React from 'react'
import PropTypes from 'prop-types'

class ClueBoard extends React.Component {
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
      clue: '',
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
    this.props.moves.submitClue(this.state.clue)
  }

  render() {
    const clueForm = (
      <div>
        <input type="text" name="clue" value={this.state.clue} onChange={this.handleChange} />
        <button onClick={() => this.handleSubmit()} disabled={!this.state.clue}>
          Submit your clue
        </button>
      </div>
    )
    return <div>{clueForm}</div>
  }
}

export default ClueBoard
