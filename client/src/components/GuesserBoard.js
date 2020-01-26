import React from 'react'
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
          <div class="guess">
            <div class="guess-form">
              <h2>{this.props.G.stage[stage]}</h2>
              <GuessForm {...this.props} playerID={this.props.playerID} />
              <div>
                <h4>Correct guess = 1 point</h4>
                <h4>Incorrect guess = 0 points and loss of an extra round</h4>
                <h4>Skip = 0 points</h4>
                <h4>Remember, the mystery word is a single word</h4>
              </div>
            </div>
            <div class="clues">
              <h4>Your clues are:</h4>
              <ul>
                {Object.keys(this.props.G.clues).map((clue, i) =>
                  this.props.G.clues[clue] > 0 ? (
                    <li key={i} className="emphasis">
                      {clue}
                    </li>
                  ) : (
                    ''
                  )
                )}
              </ul>
            </div>
          </div>
        ) : (
          <h2>Waiting for your clues...</h2>
        )}
      </div>
    )
  }
}

export default GuesserBoard
