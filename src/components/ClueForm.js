import React, { useState } from 'react'
import Rules from './Rules'

const ClueForm = props => {
  const [clue, setClue] = useState('')

  const handleChange = evt => {
    setClue(evt.target.value.toUpperCase().replace(/ /g, ''))
  }

  const handleClueSubmit = () => {
    props.moves.submitClue(clue)
    setClue('')
  }

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            name="clue"
            value={clue}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <button
            onClick={() => handleClueSubmit()}
            disabled={props.G.currentWord.includes(clue) || clue.includes(props.G.currentWord)}
            // hidden={!clue || !this.props.isActive}
          >
            Submit your clue
          </button>
        </div>
      </form>
      <Rules />
    </div>
  )
}

export default ClueForm
