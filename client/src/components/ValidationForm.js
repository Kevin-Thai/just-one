import React, { useState } from 'react'
import { CustomInput, Label, Button, Form, FormGroup } from 'reactstrap'

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
    <div className="flex-form">
      <Form>
        {Object.keys(props.G.clues).map((clue, i) => (
          <FormGroup key={i}>
            <Label for="clue"></Label>
            <div>
              <CustomInput
                type="radio"
                value={1}
                name={clue}
                id={`approve${i}`}
                // checked={props.G.clues[clue] > -50}
                onChange={() => handleVoteChange(clue, 1)}
                disabled={props.G.clues[clue] < -50}
                inline
                label="Approve"
              />
              <CustomInput
                type="radio"
                value={-1}
                name={clue}
                id={`reject${i}`}
                // checked={props.G.clues[clue] < -50}
                onChange={() => handleVoteChange(clue, -1)}
                inline
                label="Reject"
              />
              <span className="emphasis"> {clue}</span>
              <span className="warning">
                {props.G.clues[clue] < -50 ? ' (DUPLICATE SUBMISSION)' : ''}
              </span>
            </div>
          </FormGroup>
        ))}
        <Button
          onClick={handleValidate}
          disabled={Object.keys(props.G.clues).length !== Object.keys(votes).length}>
          Finalize Votes
        </Button>
      </Form>
      <hr />
    </div>
  )
}

export default ValidationForm
