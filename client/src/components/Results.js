import React, { useEffect } from 'react'
import { ListGroupItem, ListGroup } from 'reactstrap'

export default props => {
  useEffect(() => {
    props.events.setActivePlayers({
      all: { stage: 'waiting' },
    })
    if (props.guesser && props.G.result) setTimeout(() => props.events.endTurn(), 7000)
  }, [props.guesser, props.G.result, props.events])
  const switcher = () => {
    switch (props.G.result) {
      case 'correct':
        return <h2 className="correct">Your team guessed correctly!</h2>
      case 'incorrect':
        return (
          <div>
            <h2 className="incorrect">Wrong! That was not the mystery word.</h2>
            <h4>
              <span className="incorrect">{props.G.guess}</span> was your team's guess.
            </h4>
          </div>
        )
      case 'skipped':
        return <h2 className="hidden">The guesser skipped their turn.</h2>
      default:
        return ''
    }
  }

  return (
    <div>
      <h1>The results are in!</h1>
      {switcher()}
      <hr />
      <h4>
        <span className="emphasis">{props.G.currentWord}</span> was the mystery word.
      </h4>
      <hr />
      <h4>These were the available clues:</h4>
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
  )
}
