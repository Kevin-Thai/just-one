import React, { useEffect, useState } from 'react'

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
      {props.isActive ? (
        <form onSubmit={handleValidate}>
          {Object.keys(props.G.clues).map((clue, i) => (
            <div key={i}>
              {props.G.clues[clue] > -50 ? (
                <label>
                  Approve
                  <input
                    type="radio"
                    value={1}
                    name={clue}
                    checked={votes[clue] === 1}
                    onChange={() => handleVoteChange(clue, 1)}
                  />
                </label>
              ) : (
                <span>(DUPLICATE SUBMISSION)</span>
              )}
              <label key={i}>
                Reject
                <input
                  type="radio"
                  value={-1}
                  name={clue}
                  checked={votes[clue] === -1}
                  onChange={() => handleVoteChange(clue, -1)}
                />
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
      ) : (
        ''
      )}
    </div>
  )
}

export default ValidationForm
