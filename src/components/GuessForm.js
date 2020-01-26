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
      <h4>Your clues are:</h4>
      <ul>
        {Object.keys(props.G.clues).map((clue, i) =>
          props.G.clues[clue] > 0 ? (
            <li key={i} className="emphasis">
              {clue}
            </li>
          ) : (
            ''
          )
        )}
      </ul>
      <input type="text" name="guess" value={guess} onChange={handleChange} autoComplete="off" />
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
