import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ValidationForm from './ValidationForm'

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
        {stage === 'validate' ? (
          <ValidationForm
            {...this.props}
            handleValidate={() => this.handleValidate()}
            handleVoteChange={(clue, val) => this.handleVoteChange(clue, val)}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default ClueBoard
