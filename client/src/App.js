import React, { useState } from 'react'
import { SocketIO } from 'boardgame.io/multiplayer'
// import { Local } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
import { Lobby } from 'boardgame.io/react'

import JustOne from './components/Game'
import Board from './components/Board'
import GameInfoForm from './components/GameInfoForm'
import './App.css'

const GameClient = Client({
  game: JustOne,
  board: Board,
  numPlayers: 4,
  debug: false,
  multiplayer: SocketIO({ server: `${window.location.hostname}:${8000}` }),
})

const App = () => {
  const [playerID, setPlayerID] = useState(null)
  const [tempGameID, setTempGameID] = useState('0')
  const [gameID, setGameID] = useState(null)

  const handleChange = evt => {
    setTempGameID(evt.target.value)
  }

  const handleSubmit = val => {
    setPlayerID(val)
    setGameID(tempGameID)
  }

  return (
    <div>
      {!playerID || !gameID ? (
        <GameInfoForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          tempGameID={tempGameID}
        />
      ) : (
        <GameClient playerID={playerID} gameID={gameID} setGameID={setGameID} />
      )}
      {/* <Lobby
        gameServer={`https://${window.location.hostname}:8000`}
        lobbyServer={`https://${window.location.hostname}:8000`}
        gameComponents={[{ game: JustOne, board: Board }]}
      /> */}
    </div>
  )
}

export default App
