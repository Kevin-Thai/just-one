import React, { useState } from 'react'
import { SocketIO } from 'boardgame.io/multiplayer'
// import { Local } from 'boardgame.io/multiplayer'
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
  const [playerID, setPlayerID] = useState(params.id)
  const [gameID, setGameID] = useState(params.game)
  const [secret, setSecret] = useState(params.secret)

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

  // const [tempGameID, setTempGameID] = useState('0')

  // const handleChange = evt => {
  //   setTempGameID(evt.target.value)
  // }

  // const handleSubmit = val => {
  //   setPlayerID(val)
  //   setGameID(tempGameID)
  // }

  // return (
  //   <div>
  //     {!playerID || !gameID ? (
  //       <GameInfoForm
  //         handleChange={handleChange}
  //         handleSubmit={handleSubmit}
  //         tempGameID={tempGameID}
  //       />
  //     ) : (
  //       <GameClient playerID={playerID} gameID={gameID} setGameID={setGameID} />
  //     )}
  //     {/* <Lobby
  //       gameServer={`https://${window.location.hostname}:8000`}
  //       lobbyServer={`https://${window.location.hostname}:8000`}
  //       gameComponents={[{ game: JustOne, board: Board }]}
  //     /> */}
  //   </div>
  // )
}

export default App
