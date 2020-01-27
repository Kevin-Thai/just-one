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
      <table>
        {Object.keys(props.G.clues).map((clue, i) => (
          <tr key={i}>
            {/* {props.G.clues[clue] > -50 ? ( */}

            <td>
              <label>
                <input
                  type="radio"
                  value={1}
                  name={clue}
                  checked={votes[clue] === 1}
                  onChange={() => handleVoteChange(clue, 1)}
                  disabled={props.G.clues[clue] < -50}
                />
                Approve
              </label>
            </td>
            {/* ) : (
              <span>(IDENTICAL SUBMISSION)</span> */}
            <td>
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
            </td>
            <td className="emphasis"> {clue}</td>
            <td className="warning">
              {props.G.clues[clue] < -50 ? ' (DUPLICATE SUBMISSION)' : ''}
            </td>
          </tr>
        ))}
        <button
          onClick={handleValidate}
          disabled={Object.keys(props.G.clues).length !== Object.keys(votes).length}>
          Finalize Votes
        </button>
      </table>
      <Rules stage="validate" />
    </div>
  )
}

export default ValidationForm
