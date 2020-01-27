import React, { useState } from 'react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
// import { Lobby } from 'boardgame.io/react'

import JustOne from './components/Game'
import Board from './components/Board'
// import GameInfoForm from './components/GameInfoForm'
import './App.css'

const GameClient = Client({
  game: JustOne,
  board: Board,
  debug: false,
  multiplayer: SocketIO({ server: `${window.location.hostname}:${8000}` }),
  // multiplayer: SocketIO({ server: `https://just-one-game.herokuapp.com/` }),
})

const App = props => {
  const { params } = props.match
  const [playerID] = useState(params.id)
  const [gameID, setGameID] = useState(params.game)
  const [secret] = useState(params.secret)

  return (
    <div>
      <GameClient
        gameID={gameID}
        credentials={secret}
        playerID={playerID + ''}
        setGameID={setGameID}
      />
    </div>
  )
}

export default App
