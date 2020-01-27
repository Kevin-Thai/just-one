import React, { useState } from 'react'
import { Form, Input, Button } from 'reactstrap'
import Rules from './Rules'

const ClueForm = props => {
  const [clue, setClue] = useState('')

  const handleChange = evt => {
    setClue(evt.target.value.toUpperCase().replace(/ /g, ''))
  }

  const handleClueSubmit = evt => {
    evt.preventDefault()
    props.moves.submitClue(clue)
    setClue('')
  }

  return (
    <div>
      <Form inline onSubmit={handleClueSubmit}>
        <div>
          <Input
            type="text"
            name="clue"
            value={clue}
            onChange={handleChange}
            required
            maxLength="20"
            autoComplete="off"
          />
          <Button
            // onClick={() => handleClueSubmit()}
            color="success"
            disabled={props.G.currentWord.includes(clue) || clue.includes(props.G.currentWord)}
            // hidden={!clue || !this.props.isActive}
          >
            Submit your clue
          </Button>
        </div>
      </Form>
      <br />
      <hr />
      <Rules />
    </div>
  )
}

export default ClueForm
