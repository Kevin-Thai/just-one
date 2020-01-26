import React, { useState } from 'react'
import { SocketIO } from 'boardgame.io/multiplayer'
// import { Local } from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react'
import JustOne from './components/Game'
import Board from './components/Board'
import './App.css'

import { Lobby } from 'boardgame.io/react'

const GameClient = Client({
  game: JustOne,
  board: Board,
  // multiplayer: Local(),
  // numPlayers: 2,
  // debug: false,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
})

const App = () => {
  const [playerID, setPlayerID] = useState(null)
  const [gameID, setGameID] = useState('0')

  const handleChange = evt => {
    setGameID(evt.target.value)
  }

  return (
    <div>
      {!playerID || !gameID ? (
        <div>
          <div>
            <button onClick={() => setPlayerID('0')}>Player 0</button>
            <button onClick={() => setPlayerID('1')}>Player 1</button>
            <button onClick={() => setPlayerID('2')}>Player 2</button>
            <button onClick={() => setPlayerID('3')}>Player 3</button>
            <button onClick={() => setPlayerID('4')}>Player 4</button>
            <button onClick={() => setPlayerID('5')}>Player 5</button>
            <button onClick={() => setPlayerID('6')}>Player 6</button>
          </div>
          <form>
            <label>Enter a Room #</label>
            <input type="text" name="gameID" value={gameID} onChange={handleChange} />
            {/* <button onClick={() => handleChange()} disabled={!gameID}></button> */}
          </form>
        </div>
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
