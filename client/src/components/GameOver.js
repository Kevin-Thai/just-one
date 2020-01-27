import React from 'react'
import history from '../history'

const GameOver = props => {
  return (
    <div>
      <h2>{props.ctx.gameover}</h2>
      <button onClick={() => history.push('/')}>Return to Lobby</button>
    </div>
  )
}

export default GameOver
