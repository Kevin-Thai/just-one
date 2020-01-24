import React from 'react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Local } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
import JustOne from './components/Game'
import Board from './components/Board'
import './App.css'

import { Lobby } from 'boardgame.io/react'

const GameClient = Client({
  game: JustOne,
  board: Board,
  // multiplayer: Local(),
  numPlayers: 4,
  // debug: false,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
})

const App = () => (
  <div>
    <Lobby
      gameServer={`https://${window.location.hostname}:8000`}
      lobbyServer={`https://${window.location.hostname}:8000`}
      gameComponents={[{ game: JustOne, board: Board }]}
    />
    {/* <GameClient playerID="0" />
    <br />
    <GameClient playerID="1" />
    <br />
    <GameClient playerID="2" />
    <br />
    <GameClient playerID="3" /> */}
  </div>
)

export default App
