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
  // multiplayer: SocketIO({ server: 'localhost:8000' }),
})

const App = () => <GameClient />

export default App
