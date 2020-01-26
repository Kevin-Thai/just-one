import React, { useEffect } from 'react'

export default props => {
  useEffect(() => {
    if (props.guesser && props.G.result) setTimeout(() => props.events.endTurn(), 6000)
  }, [])
  const switcher = () => {
    switch (props.G.result) {
      case 'correct':
        return <h2>Correct!</h2>
      case 'incorrect':
        return (
          <div>
            <h2>Incorrect</h2>
            <h4>The guess: {props.G.guess}</h4>
          </div>
        )
      case 'skipped':
        return <h2>The guesser skipped the turn</h2>
      default:
        return ''
    }
  }

  return (
    <div>
      <h1>Results: </h1>
      {switcher()}
      <h4>The mystery word: {props.G.currentWord} </h4>
    </div>
  )
}
