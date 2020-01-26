import React from 'react'
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
    console.log(this.props.gameID, 'props')
    return this.props.ctx.gameover ? (
      <GameOver {...this.props} />
    ) : (
      <div className="board">
        <div className="left">
          {/* <h4>
            Your team's score: <span ></span>
          </h4> */}
          {this.props.playerID === this.props.ctx.currentPlayer ? (
            <GuesserBoard {...this.props} />
          ) : (
            <ClueBoard {...this.props} />
          )}
        </div>
        <div className="right">
          <table>
            <thead>
              <tr>
                <th className="emphasis">Score: {this.props.G.score}/13</th>
              </tr>
            </thead>
            <tbody>
              {this.props.G.words.map((word, i) => (
                <tr className={this.props.G.guesses[word] || 'hidden'} key={i}>
                  <td>{this.props.G.guesses[word] ? word : '???'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Board
