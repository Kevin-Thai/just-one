import React, { Fragment } from 'react'

export default props => (
  <div className="rules">
    {props.stage === 'validate' ? (
      <Fragment>
        <h4>Validation rules:</h4>
        <ul>
          <li>
            Reject all clues that are identical or variants of the same word (plurals, misspellings,
            gender differentiations)
          </li>
          <li>Reject all clues that are from the same word family (e.g. Prince and Princess)</li>
        </ul>
      </Fragment>
    ) : (
      ''
    )}
    <h4>Valid clues:</h4>
    <ul>
      <li>A single word that is not the Mystery word</li>
      <li>A digit or number (e.g. '1', '007', '7732025862' are valid clues)</li>
      <li>An onomatopoeia (e.g. 'RIIIIIING' is a valid clue for the Mystery word 'PHONE')</li>
      <li>An acronym (e.g. 'FBI' is a valid clue)</li>
      <li>A special character (e.g. '$' is a valid clue for the Mystery word 'CAPITALISM')</li>
    </ul>
    <h4>Invalid clues:</h4>
    <ul>
      <li>
        More than one word (e.g. 'GEORGEWASHINGTON' is not a valid clue, but 'GEORGE' or
        'WASHINGTON' are valid)
      </li>
      <li>
        The Mystery word but spelled differently (e.g. 'SHURT' is not allowed if the mystery word is
        'SHIRT')
      </li>
      <li>
        The Mystery word in a foreign language (e.g. 'GRANDE' is not allowed if the mystery word is
        'BIG')
      </li>
      <li>
        A word from the same family as the Mystery word (e.g. 'PRINCESS' is not allowed if the
        mystery word is 'PRINCE')
      </li>
      <li>
        A made up word (e.g. 'YUMYUMBREAD' is not a valid clue for 'CAKE', or any mystery word
        really)
      </li>
      <li>
        A word that is phonetically identical to the Mystery word (e.g. 'WHETHER' is not a allowed
        if the mystery word is 'WEATHER')
      </li>
    </ul>
  </div>
)
