import React, { useEffect } from 'react'

export default props => {
  useEffect(() => {
    if (props.guesser && props.G.result) setTimeout(() => props.events.endTurn(), 6500)
  }, [])
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
      <h4>
        <span className="emphasis">{props.G.currentWord}</span> was the mystery word.
      </h4>
    </div>
  )
}
