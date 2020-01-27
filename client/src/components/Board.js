import React from 'react'
import { Table } from 'reactstrap'
import PropTypes from 'prop-types'
import GuesserBoard from './GuesserBoard'
import ClueBoard from './ClueBoard'
import GameOver from './GameOver'

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    gameID: PropTypes.string,
    isActive: PropTypes.bool,
    events: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div className="board">
        {this.props.ctx.gameover ? (
          <GameOver {...this.props} />
        ) : (
          <div className="left">
            {this.props.playerID === this.props.ctx.currentPlayer ? (
              <GuesserBoard {...this.props} />
            ) : (
              <ClueBoard {...this.props} />
            )}
          </div>
        )}
        <div className="right">
          <h5>You are Player {Number(this.props.playerID) + 1}</h5>
          {/* <h3>Room: {this.props.gameID}</h3> */}
          <Table size="sm">
            <thead>
              <tr>
                <th className="emphasis">Score: {this.props.G.score}/13</th>
              </tr>
            </thead>
            <tbody>
              {this.props.G.words.map((word, i) => (
                <tr className={this.props.G.guesses[word] || 'hidden'} key={i}>
                  <td className="centered">{this.props.G.guesses[word] ? word : '???'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default Board
