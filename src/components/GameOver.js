import React from 'react'

const GameOver = props => {
  const handleNewGame = () => {
    props.setGameID(String(Number(props.gameID) + 1) || 1111)
  }

  return (
    <div>
      <h2>{props.ctx.gameover}</h2>
      <button onClick={() => handleNewGame()}>Start a new game</button>
    </div>
  )
}

export default GameOver
