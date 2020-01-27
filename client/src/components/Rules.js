import React, { Fragment } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

export default props => (
  <div className="rListGroupes">
    {props.stage === 'validate' ? (
      <Fragment>
        <h4>Validation rules:</h4>
        <ListGroup>
          <ListGroupItem>
            Reject all clues that are identical or variants of the same word (plurals, misspellings,
            gender differentiations)
          </ListGroupItem>
          <ListGroupItem>
            Reject all clues that are from the same word family (e.g. Prince and Princess)
          </ListGroupItem>
        </ListGroup>
      </Fragment>
    ) : (
      ''
    )}
    <br />
    <h4>Valid clues:</h4>
    <ListGroup>
      <ListGroupItem>A single word that is not the Mystery word</ListGroupItem>
      <ListGroupItem>
        A digit or number (e.g. '1', '007', '7732025862' are valid clues)
      </ListGroupItem>
      <ListGroupItem>
        An onomatopoeia (e.g. 'RIIIIIING' is a valid clue for the Mystery word 'PHONE')
      </ListGroupItem>
      <ListGroupItem>An acronym (e.g. 'FBI' is a valid clue)</ListGroupItem>
      <ListGroupItem>
        A special character (e.g. '$' is a valid clue for the Mystery word 'CAPITALISM')
      </ListGroupItem>
    </ListGroup>
    <br />
    <h4>Invalid clues:</h4>
    <ListGroup>
      <ListGroupItem>
        More than one word (e.g. 'GEORGEWASHINGTON' is not a valid clue, but 'GEORGE' or
        'WASHINGTON' are valid)
      </ListGroupItem>
      <ListGroupItem>
        The Mystery word but spelled differently (e.g. 'SHURT' is not allowed if the mystery word is
        'SHIRT')
      </ListGroupItem>
      <ListGroupItem>
        The Mystery word in a foreign language (e.g. 'GRANDE' is not allowed if the mystery word is
        'BIG')
      </ListGroupItem>
      <ListGroupItem>
        A word from the same family as the Mystery word (e.g. 'PRINCESS' is not allowed if the
        mystery word is 'PRINCE')
      </ListGroupItem>
      <ListGroupItem>
        A made up word (e.g. 'YUMYUMBREAD' is not a valid clue for 'CAKE', or any mystery word
        really)
      </ListGroupItem>
      <ListGroupItem>
        A word that is phonetically identical to the Mystery word (e.g. 'WHETHER' is not a allowed
        if the mystery word is 'WEATHER')
      </ListGroupItem>
    </ListGroup>
  </div>
)
