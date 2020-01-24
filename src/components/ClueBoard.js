import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

class ClueBoard extends React.Component {
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
      clue: '',
      votes: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClueSubmit = this.handleClueSubmit.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
    this.handleVoteChange = this.handleVoteChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value.toUpperCase(),
    })
  }

  handleClueSubmit() {
    this.props.moves.submitClue(this.state.clue)
    this.setState({ clue: '' })
  }

  handleVoteChange(clue, val) {
    this.setState(prevState => ({
      votes: { ...prevState.votes, [clue]: val },
    }))
  }

  handleValidate(evt) {
    evt.preventDefault()
    this.props.moves.validateClue(this.state.votes)
    this.setState({ votes: {} })
    // Object.keys(this.props.G.clues).forEach(clue => {
    //   this.props.G.clues[clue] += this.state.votes[clue]
    // })
  }

  // handleSwitch(stage) {
  //   switch (stage) {
  //     case 'clue':
  //       return clueForm
  //       break;

  //     default:
  //       break;
  //   }
  // }

  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    const clueForm = (
      <div>
        {this.props.isActive ? (
          <form>
            <div>
              <input
                type="text"
                name="clue"
                value={this.state.clue}
                onChange={this.handleChange}
                required
              />
              <button
                onClick={() => this.handleClueSubmit()}
                disabled={
                  this.props.G.currentWord.includes(this.state.clue) ||
                  this.state.clue.includes(this.props.G.currentWord)
                }
                // hidden={!this.state.clue || !this.props.isActive}
              >
                Submit your clue
              </button>
            </div>
          </form>
        ) : (
          ''
        )}
      </div>
    )

    const validateForm = (
      <div>
        {this.props.isActive ? (
          <form onSubmit={this.handleValidate}>
            {Object.keys(this.props.G.clues).map((clue, i) => (
              <div key={i}>
                {this.props.G.clues[clue] > -50 ? (
                  <label>
                    Approve
                    <input
                      type="radio"
                      value={1}
                      name={clue}
                      checked={this.state.votes[clue] === 1}
                      onChange={() => this.handleVoteChange(clue, 1)}
                    />
                  </label>
                ) : (
                  <span>(DUPLICATE SUBMISSION)</span>
                )}
                <label key={i}>
                  Reject
                  <input
                    type="radio"
                    value={-1}
                    name={clue}
                    checked={this.state.votes[clue] === -1}
                    onChange={() => this.handleVoteChange(clue, -1)}
                  />
                </label>
                <span className="emphasis"> {clue}</span>
                {/* <span className="warning">
                  {this.props.G.clues[clue] < 0 ? ' (DUPLICATE SUBMISSION)' : ''}
                </span> */}
              </div>
            ))}
            <button
              type="submit"
              disabled={
                Object.keys(this.props.G.clues).length !== Object.keys(this.state.votes).length
              }>
              Finalize Votes
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
    )

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
        {stage === 'clue' ? clueForm : ''}
        {stage === 'validate' ? validateForm : ''}
      </div>
    )
  }
}

export default ClueBoard
