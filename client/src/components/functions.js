export const stages = {
  clue: 'Submit your clues',
  validate: `Validate your team's clues`,
  guess: 'What is the mystery word?',
}

export function endTurn(G, ctx) {
  ctx.events.endTurn()
}

export function skipTurn(G, ctx) {
  G.guesses[G.currentWord] = 'incorrect'
  G.result = 'skipped'
  ctx.events.setActivePlayers({ currentPlayer: 'results' })
}

export const randomWords = arr => {
  let i = arr.length,
    temp,
    randomI
  while (i > 0) {
    randomI = Math.floor(Math.random() * i)
    i -= 1
    temp = arr[i]
    arr[i] = arr[randomI]
    arr[randomI] = temp
  }
  return arr.slice(0, 13)
}

export function submitClue(G, ctx, clue) {
  clue = String(clue).toUpperCase()
  if (G.clues[clue]) G.clues[clue] = -100
  else G.clues[clue] = 1
  if (Object.keys(ctx.activePlayers).length === 1)
    ctx.events.setActivePlayers({ others: 'validate', moveLimit: 1 })
}
export function submitGuess(G, ctx, guess) {
  guess = String(guess).toUpperCase()
  if (guess === G.currentWord) {
    G.score++
    G.guesses[G.currentWord] = 'correct'
    G.result = 'correct'
  } else {
    G.fails++
    G.guesses[G.words[13 - G.fails]] = 'deleted'
    G.guesses[G.currentWord] = 'incorrect'
    G.guess = guess
    G.result = 'incorrect'
  }
  ctx.events.setActivePlayers({ currentPlayer: 'results' })
}
export function validateClue(G, ctx, votesArr) {
  Object.keys(G.clues).forEach(clue => {
    G.clues[clue] += votesArr[clue]
  })
  if (Object.keys(ctx.activePlayers).length === 1)
    ctx.events.setActivePlayers({ currentPlayer: { stage: 'guess', moveLimit: 1 } })
}
