import React, { Fragment } from 'react'
import GuessForm from './GuessForm'
import Results from './Results'

class GuesserBoard extends React.Component {
  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    return this.props.G.result ? (
      <Results {...this.props} guesser={true} />
    ) : (
      <div>
        <h1>You are the guesser!</h1>
        {stage === 'guess' ? (
          <Fragment>
            <h2>{this.props.G.stage[stage]}</h2>
            <GuessForm {...this.props} playerID={this.props.playerID} />
            <div>
              <h4>Remember, the mystery word is a single word</h4>
            </div>
          </Fragment>
        ) : (
          <h2>Waiting for your clues...</h2>
        )}
      </div>
    )
  }
}

export default GuesserBoard
