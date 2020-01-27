import React, { useState } from 'react'
import { CardBody } from 'reactstrap'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
// import { Lobby } from 'boardgame.io/react'

import JustOne from './components/Game'
import Board from './components/Board'
// import GameInfoForm from './components/GameInfoForm'
import './App.css'
import { PORT } from '../../server'

const GameClient = Client({
  game: JustOne,
  board: Board,
  debug: false,
  multiplayer: SocketIO({ server: `${window.location.hostname}:${PORT}` }),
  // multiplayer: SocketIO({ server: `https://just-one-game.herokuapp.com/` }),
})

const App = props => {
  const { params } = props.match
  const [playerID] = useState(params.id)
  const [gameID] = useState(params.game)
  const [secret] = useState(params.secret)

  return (
    <div>
      <CardBody>
        <GameClient gameID={gameID} credentials={secret} playerID={playerID + ''} />
      </CardBody>
    </div>
  )
}

export default App
