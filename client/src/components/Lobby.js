import React from 'react'
import request from 'superagent'

const API_PORT = 8001

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: 7,
      gameID: '',
      names: {
        0: 'Player 1',
        1: 'Player 2',
        2: 'Player 3',
        3: 'Player 4',
        4: 'Player 5',
        5: 'Player 6',
        6: 'Player 7',
      },
      secret: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
      },
      created: false,
    }
    this.apiBase =
      process.env.NODE_ENV === 'production'
        ? '/api'
        : `${window.location.protocol}//${window.location.hostname}:${API_PORT}`
  }

  createGame = async () => {
    const r = await request.post(`${this.apiBase}/create`).send({
      players: this.state.players,
      names: this.state.names,
    })
    const gameID = r.body.game
    for (let i = 0; i < r.body.credentials.length; i++) {
      this.setState({
        secret: {
          ...this.state.secret,
          [i]: r.body.credentials[i],
        },
      })
    }
    this.setState({ gameID, created: true })
  }

  onUpdatePlayerCount = evt => {
    this.setState({ players: parseInt(evt.target.value) })
  }

  onUpdateName = (idx, evt) => {
    this.setState({
      names: {
        ...this.state.names,
        [idx]: evt.target.value,
      },
    })
  }

  isFormValid = () => {
    for (let i = 0; i < this.state.players; i++) {
      if (!this.state.names[i]) return false
    }
    return true
  }

  render() {
    let createForm = ''
    let linkDisplay = ''
    if (!this.state.created) {
      createForm = (
        <div>
          <form>
            <label htmlFor="players">Players</label>
            <select
              name="players"
              id="players"
              onChange={this.onUpdatePlayerCount}
              value={this.state.players}>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </form>
          <form>
            {Array(this.state.players)
              .fill(0)
              .map((val, i) => (
                <div key={i}>
                  <label htmlFor={`player${i}`}>Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    name={`player${i}`}
                    id={`player${i}`}
                    onChange={evt => this.onUpdateName(i, evt)}
                    value={this.state.names[i]}
                  />
                </div>
              ))}
          </form>
          <button disabled={!this.isFormValid()} onClick={this.createGame}>
            Submit
          </button>
        </div>
      )
    } else {
      linkDisplay = (
        <div>
          <p>Distribute these links to the other players individually</p>
          <table>
            <tbody>
              {Array(this.state.players)
                .fill(0)
                .map((val, i) => (
                  <tr key={i}>
                    <td>{this.state.names[i]}</td>
                    <td>
                      <a
                        href={`${window.location.origin}/${this.state.gameID}/${i}/${this.state.secret[i]}`}>
                        {window.location.origin}/{this.state.gameID}/{i}/{this.state.secret[i]}
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        {createForm}
        {linkDisplay}
      </div>
    )
  }
}

export default Lobby
