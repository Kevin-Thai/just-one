import React from 'react'
import { SocketIO, Local } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
import JustOne from './components/Game'
import Board from './components/Board'
import './App.css'

const GameClient = Client({
  game: JustOne,
  board: Board,
  multiplayer: Local(),
  numPlayers: 4,
  // debug: false
  // multiplayer: SocketIO({ server: 'localhost:8000' }),
})

// const App = () => <GameClient />
const App = () => (
  <div>
    <GameClient playerID="0" />
    <br />
    <GameClient playerID="1" />
    <br />
    <GameClient playerID="2" />
    <br />
    <GameClient playerID="3" />
  </div>
)

export default App
