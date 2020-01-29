import React, { Fragment } from 'react'
import { Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import ValidationForm from './ValidationForm'
import ClueForm from './ClueForm'
import Results from './Results'
import Rules from './Rules'

const ClueBoard = props => {
  return props.G.result ? (
    <Results {...props} playerID={props.playerID} />
  ) : (
    <Fragment>
      <h2>{props.stage ? props.G.stage[props.stage] : 'Waiting...'}</h2>
      <div>
        {props.G.currentWord ? (
          <h3>
            The mystery word is: <span className="emphasis">{props.G.currentWord}</span>
          </h3>
        ) : (
          ''
        )}
      </div>
      {props.stage === 'clue' ? <ClueForm {...props} /> : ''}
      {props.stage === 'validate' ? <ValidationForm {...props} /> : ''}
      {props.stage === 'clue' || props.stage === 'validate' ? (
        <Rules stage={props.stage === 'validate' ? 'validate' : ''} />
      ) : (
        ''
      )}
      {props.stage !== 'clue' &&
      props.stage !== 'validate' &&
      !Object.values(props.ctx.activePlayers).includes('guess') ? (
        <h4>
          <Spinner color="primary" /> Waiting for the other clue givers...
        </h4>
      ) : (
        ''
      )}
      {Object.values(props.ctx.activePlayers).includes('guess') ? (
        <div>
          <h4>
            <Spinner color="primary" /> Validations submitted! Waiting for the guesser...
          </h4>
          <hr />
          <h4>The valid clues are:</h4>
          <ListGroup>
            {Object.keys(props.G.clues).map((clue, i) =>
              props.G.clues[clue] > 0 ? (
                <ListGroupItem key={i} className="emphasis">
                  {clue}
                </ListGroupItem>
              ) : (
                ''
              )
            )}
          </ListGroup>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  )
}

export default ClueBoard
