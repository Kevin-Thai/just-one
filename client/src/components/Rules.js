import React, { Fragment, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

export default props => {
  const [hidden, setHidden] = useState(true)

  const onHide = () => {
    setHidden(!hidden)
  }

  return hidden ? (
    <p onClick={onHide}>Click here to show the rules</p>
  ) : (
    <div className="rules">
      <p onClick={onHide}>Click here to hide the rules</p>
      {props.stage === 'validate' ? (
        <Fragment>
          <h4>Validation rules:</h4>
          <ListGroup>
            <ListGroupItem>
              Reject all clues that are identical or variants of the same word <br />
              (i.e. plurals, misspellings, gender differentiations)
            </ListGroupItem>
            <ListGroupItem>
              Reject all clues that are from the same word family <br />
              (e.g. Prince and Princess)
            </ListGroupItem>
          </ListGroup>
          <br />
        </Fragment>
      ) : (
        ''
      )}
      <h4>Valid clues:</h4>
      <ListGroup>
        <ListGroupItem>
          A digit or number <br />
          (e.g. '1', '007', '7732025862' are valid clues)
        </ListGroupItem>
        <ListGroupItem>
          An onomatopoeia <br />
          (e.g. 'RIIIIIING' is a valid clue for the Mystery word 'PHONE')
        </ListGroupItem>
        <ListGroupItem>
          An acronym <br />
          (e.g. 'FBI' is a valid clue)
        </ListGroupItem>
        <ListGroupItem>
          A special character <br />
          (e.g. '$' is a valid clue for the Mystery word 'CAPITALISM')
        </ListGroupItem>
      </ListGroup>
      <br />
      <h4>Invalid clues:</h4>
      <ListGroup>
        <ListGroupItem>
          More than one word <br />
          (e.g. 'JONSNOW' is not a valid clue, but 'JON' or 'SNOW' are)
        </ListGroupItem>
        <ListGroupItem>
          The Mystery word but spelled differently <br />
          (e.g. 'SHURT' is not allowed if the mystery word is 'SHIRT')
        </ListGroupItem>
        <ListGroupItem>
          The Mystery word in a foreign language <br />
          (e.g. 'GRANDE' is not allowed if the mystery word is 'BIG')
        </ListGroupItem>
        <ListGroupItem>
          A word from the same family as the Mystery word <br />
          (e.g. 'PRINCESS' is not allowed if the mystery word is 'PRINCE')
        </ListGroupItem>
        <ListGroupItem>
          A made up word <br />
          (e.g. 'YUMYUMBREAD' is not a valid clue for 'CAKE', or any mystery word really)
        </ListGroupItem>
        <ListGroupItem>
          A word that is phonetically identical to the Mystery word <br />
          (e.g. 'WHETHER' is not a allowed if the mystery word is 'WEATHER')
        </ListGroupItem>
      </ListGroup>
    </div>
  )
}
