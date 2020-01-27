import React from 'react'
import ValidationForm from './ValidationForm'
import ClueForm from './ClueForm'
import Results from './Results'

class ClueBoard extends React.Component {
  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    return this.props.G.result ? (
      <Results {...this.props} playerID={this.props.playerID} />
    ) : (
      <div>
        <h2>{stage ? this.props.G.stage[stage] : 'Waiting...'}</h2>
        <div>
          {this.props.G.currentWord ? (
            <h3>
              The mystery word is: <span className="emphasis">{this.props.G.currentWord}</span>
            </h3>
          ) : (
            ''
          )}
        </div>
        {stage === 'clue' ? <ClueForm {...this.props} /> : ''}
        {stage === 'validate' ? <ValidationForm {...this.props} /> : ''}
        {stage !== 'clue' && stage !== 'validate' ? <h4>Waiting for other players...</h4> : ''}
      </div>
    )
  }
}

export default ClueBoard
