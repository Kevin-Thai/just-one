import React, { useState } from 'react'

const GameOver = props => {
  const [gameID, setGameID] = useState(props.gameID)

  const handleChange = evt => {
    setGameID(evt.target.value)
  }

  const handleNewGame = () => {
    props.setGameID(gameID)
  }

  return (
    <div>
      <h2>{props.ctx.gameover}</h2>
      {/* <button onClick={() => history.pushState('/')}>Return to Lobby</button> */}
      <form>
        <label>New Room Name</label>
        <input type="text" name="gameID" value={gameID} onChange={handleChange} />
        <button onClick={() => handleNewGame()}>Start a new game</button>
      </form>
    </div>
  )
}

export default GameOver
