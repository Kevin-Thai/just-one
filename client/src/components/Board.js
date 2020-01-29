import React, { Fragment } from 'react'
import request from 'superagent'
import { Table } from 'reactstrap'
import PropTypes from 'prop-types'
import GuesserBoard from './GuesserBoard'
import ClueBoard from './ClueBoard'
import GameOver from './GameOver'
import Chat from './Chat'
import PlayersList from './PlayersList'

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
  }

  componentDidMount() {
    this.updateNames()
  }

  render() {
    const stage = this.props.ctx.activePlayers
      ? this.props.ctx.activePlayers[this.props.playerID]
      : ''
    return (
      <Fragment>
        <PlayersList {...this.props} names={this.state.names} />
        <br />
        <div className="board">
          {this.props.ctx.gameover ? (
            <GameOver {...this.props} />
          ) : (
            <div className="left">
              {this.props.playerID === this.props.ctx.currentPlayer ? (
                <GuesserBoard {...this.props} stage={stage} names={this.state.names} />
              ) : (
                <ClueBoard {...this.props} stage={stage} names={this.state.names} />
              )}
            </div>
          )}
          <div className="right">
            <Table size="sm">
              <thead>
                <tr>
                  <th className="emphasis">Score: {this.props.G.score}/13</th>
                </tr>
              </thead>
              <tbody>
                {this.props.G.words.map((word, i) => (
                  <tr className={this.props.G.guesses[word] || 'hidden'} key={i}>
                    <td className="centered">
                      {this.props.G.guesses[word] && this.props.G.guesses[word] !== 'deleted'
                        ? word
                        : '???'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* {stage === 'validate' || stage === 'waiting' ? ( */}
            {this.props.playerID !== this.props.ctx.currentPlayer ? (
              <Chat {...this.props} name={this.state.names[this.props.playerID]} stage={stage} />
            ) : (
              ''
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Board
