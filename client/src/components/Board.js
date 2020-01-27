import React from 'react'
import request from 'superagent'
import { Table } from 'reactstrap'
import PropTypes from 'prop-types'
import GuesserBoard from './GuesserBoard'
import ClueBoard from './ClueBoard'
import GameOver from './GameOver'
import Chat from './Chat'

const API_PORT = 8001

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

  constructor(props) {
    super(props)
    let names = []
    for (let i = 0; i < this.props.ctx.numPlayers; i++) names.push('')
    this.state = {
      names,
    }
    this.apiBase =
      process.env.NODE_ENV === 'production'
        ? '/api'
        : `${window.location.protocol}//${window.location.hostname}:${API_PORT}`
  }

  updateName(index, name) {
    this.setState({ names: { ...this.state.names, [index]: name } })
  }

  async updateNames() {
    const g = await request.get(`${this.apiBase}/players/${this.props.gameID}`)

    g.body.players.forEach(player => {
      if (typeof player.name !== 'undefined') this.updateName(player.id, player.name)
    })
    console.log(this.state.names, 'g')
  }

  componentDidMount() {
    this.updateNames()
  }

  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    return (
      <div className="board">
        {this.props.ctx.gameover ? (
          <GameOver {...this.props} />
        ) : (
          <div className="left">
            {this.props.playerID === this.props.ctx.currentPlayer ? (
              <GuesserBoard {...this.props} stage={stage} />
            ) : (
              <ClueBoard {...this.props} stage={stage} />
            )}
          </div>
        )}
        <div className="right">
          <h5>Your name: {this.state.names[this.props.playerID]}</h5>
          {this.props.ctx.currentPlayer !== this.props.playerID ? (
            <h5>The current guesser is: {this.state.names[this.props.ctx.currentPlayer]}</h5>
          ) : (
            ''
          )}
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
          {stage === 'validate' || stage === 'waiting' ? (
            <Chat {...this.props} name={this.state.names[this.props.playerID]} />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default Board
