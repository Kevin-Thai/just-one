import React from 'react'
import history from '../history'
import { Button } from 'reactstrap'

const GameOver = props => {
  return (
    <div>
      <h2>{props.ctx.gameover}</h2>
      <Button onClick={() => history.push('/')} color="info">
        Return to Lobby
      </Button>
    </div>
  )
}

export default GameOver
