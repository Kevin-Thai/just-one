import React from 'react'
import { Spinner } from 'reactstrap'
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
        {this.props.stage !== 'clue' && this.props.stage !== 'validate' ? (
          <h4>
            <Spinner color="primary" /> Waiting for other players to finish...
          </h4>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default ClueBoard
