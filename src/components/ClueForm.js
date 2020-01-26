import React, { useEffect, useState } from 'react'

const ClueForm = props => {
  const [clue, setClue] = useState('')

  const handleChange = evt => {
    setClue(evt.target.value.toUpperCase())
  }

  const handleClueSubmit = () => {
    props.moves.submitClue(clue)
    setClue('')
  }

  return (
    <div>
      {props.isActive ? (
        <form>
          <div>
            <input type="text" name="clue" value={clue} onChange={handleChange} required />
            <button
              onClick={() => handleClueSubmit()}
              disabled={props.G.currentWord.includes(clue) || clue.includes(props.G.currentWord)}
              // hidden={!clue || !this.props.isActive}
            >
              Submit your clue
            </button>
          </div>
        </form>
      ) : (
        ''
      )}
    </div>
  )
}

export default ClueForm
