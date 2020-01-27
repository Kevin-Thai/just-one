import React, { useState } from 'react'

const GuessForm = props => {
  const [guess, setGuess] = useState('')

  const handleChange = evt => {
    setGuess(evt.target.value.toUpperCase().replace(/ /g, ''))
  }

  const handleGuessSubmit = () => {
    props.moves.submitGuess(guess)
    setGuess('')
  }

  return (
    <div>
      <input
        type="text"
        name="guess"
        value={guess}
        onChange={handleChange}
        autoComplete="off"
        maxLength="20"
      />
      <button onClick={() => handleGuessSubmit()} disabled={!props.isActive || !guess}>
        Submit guess
      </button>
      <button onClick={() => props.moves.skipTurn()} disabled={!props.isActive}>
        Skip
      </button>
    </div>
  )
}

export default GuessForm
