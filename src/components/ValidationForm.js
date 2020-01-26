import React, { useState } from 'react'
import Rules from './Rules'

const ValidationForm = props => {
  const [votes, setVotes] = useState({})

  const handleVoteChange = (clue, val) => {
    setVotes({ ...votes, [clue]: val })
  }

  const handleValidate = evt => {
    evt.preventDefault()
    props.moves.validateClue(votes)
    setVotes({})
  }
  return (
    <div>
      <form onSubmit={handleValidate}>
        {Object.keys(props.G.clues).map((clue, i) => (
          <div key={i}>
            {props.G.clues[clue] > -50 ? (
              <label>
                <input
                  type="radio"
                  value={1}
                  name={clue}
                  checked={votes[clue] === 1}
                  onChange={() => handleVoteChange(clue, 1)}
                />
                Approve
              </label>
            ) : (
              <span>(IDENTICAL SUBMISSION)</span>
            )}
            <label key={i}>
              <input
                type="radio"
                value={-1}
                name={clue}
                checked={votes[clue] === -1}
                onChange={() => handleVoteChange(clue, -1)}
              />
              Reject
            </label>
            <span className="emphasis"> {clue}</span>
            {/* <span className="warning">
              {props.G.clues[clue] < 0 ? ' (DUPLICATE SUBMISSION)' : ''}
            </span> */}
          </div>
        ))}
        <button
          type="submit"
          disabled={Object.keys(props.G.clues).length !== Object.keys(votes).length}>
          Finalize Votes
        </button>
      </form>
      <Rules stage="validate" />
    </div>
  )
}

export default ValidationForm
