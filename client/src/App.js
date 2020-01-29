import React, { useState } from 'react'
import { CardBody } from 'reactstrap'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
import JustOne from './components/Game'
import Board from './components/Board'
import './App.css'

const PORT = 8000
const url =
  window.location.protocol +
  '//' +
  window.location.hostname +
  (window.location.port ? ':' + window.location.port : '')

const GameClient = Client({
  game: JustOne,
  board: Board,
  debug: false,
  multiplayer: SocketIO({
    server:
      process.env.NODE_ENV === 'production' ? `${url}` : `${window.location.hostname}:${PORT}`,
  }),
})

const App = props => {
  const { params } = props.match
  const [playerID] = useState(params.id)
  const [gameID] = useState(params.game)
  const [secret] = useState(params.secret)

  return (
    <CardBody className="content">
      <GameClient gameID={gameID} credentials={secret} playerID={playerID + ''} />
    </CardBody>
  )
}

export default App
