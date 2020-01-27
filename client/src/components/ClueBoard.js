import React from 'react'
import { Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import ValidationForm from './ValidationForm'
import ClueForm from './ClueForm'
import Results from './Results'

class ClueBoard extends React.Component {
  render() {
    return this.props.G.result ? (
      <Results {...this.props} playerID={this.props.playerID} />
    ) : (
      <div>
        <h2>{this.props.stage ? this.props.G.stage[this.props.stage] : 'Waiting...'}</h2>
        <div>
          {this.props.G.currentWord ? (
            <h3>
              The mystery word is: <span className="emphasis">{this.props.G.currentWord}</span>
            </h3>
          ) : (
            ''
          )}
        </div>
        {this.props.stage === 'clue' ? <ClueForm {...this.props} /> : ''}
        {this.props.stage === 'validate' ? <ValidationForm {...this.props} /> : ''}
        {this.props.stage !== 'clue' &&
        this.props.stage !== 'validate' &&
        !Object.values(this.props.ctx.activePlayers).includes('guess') ? (
          <h4>
            <Spinner color="primary" /> Waiting for the other clue givers...
          </h4>
        ) : (
          ''
        )}
        {Object.values(this.props.ctx.activePlayers).includes('guess') ? (
          <div>
            <h4>
              <Spinner color="primary" /> Validations submitted! Waiting for the guesser...
            </h4>
            <hr />
            <h4>The valid clues are:</h4>
            <ListGroup>
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
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default ClueBoard
