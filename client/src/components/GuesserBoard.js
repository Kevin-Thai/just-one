import React from 'react'
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'
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
          <div className="guess">
            <div className="guess-form">
              <h2>{this.props.G.stage[stage]}</h2>
              <GuessForm {...this.props} playerID={this.props.playerID} />
              <br />
              <hr />
              <div>
                <h4>Points</h4>
                <ListGroup>
                  <ListGroupItem>Correct guess = 1 point</ListGroupItem>
                  <ListGroupItem>
                    Incorrect guess = 0 points and loss of an extra round
                  </ListGroupItem>
                  <ListGroupItem>Skip = 0 points</ListGroupItem>
                </ListGroup>
              </div>
            </div>
            <div className="clues">
              <h4>Your clues are:</h4>
              <ListGroup flush>
                {Object.keys(this.props.G.clues).map((clue, i) =>
                  this.props.G.clues[clue] > 0 ? (
                    <ListGroupItem key={i} className="emphasis">
                      {clue}
                    </ListGroupItem>
                  ) : (
                    ''
                  )
                )}
              </ListGroup>
            </div>
          </div>
        ) : (
          <h2 className="hidden">
            <Spinner color="primary" /> Waiting for your clues...
          </h2>
        )}
      </div>
    )
  }
}

export default GuesserBoard
