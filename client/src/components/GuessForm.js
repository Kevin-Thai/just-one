import React, { useState } from 'react'
import { Input, Button, Form } from 'reactstrap'

const GuessForm = props => {
  const [guess, setGuess] = useState('')

  const handleChange = evt => {
    setGuess(evt.target.value.toUpperCase().replace(/ /g, ''))
  }

  const handleGuessSubmit = evt => {
    evt.preventDefault()
    props.moves.submitGuess(guess)
    setGuess('')
  }

  return (
    <Form inline onSubmit={handleGuessSubmit}>
      <div>
        <Input
          type="text"
          name="guess"
          value={guess}
          onChange={handleChange}
          autoComplete="off"
          maxLength="20"
        />
        <Button
          // onClick={() => handleGuessSubmit()}
          disabled={!props.isActive || !guess}
          color="success">
          Submit guess
        </Button>
        <Button onClick={() => props.moves.skipTurn()} disabled={!props.isActive} color="warning">
          Skip
        </Button>
      </div>
    </Form>
  )
}

export default GuessForm
