export const stages = {
  draw: 'Set the random word!',
  clue: 'Submit your clues',
  validate: `Validate your team's clues`,
  guess: 'What is the mystery word?',
}

export function nextTurn(G, ctx) {
  G.currentWord = null
  G.clues = {}
  ctx.events.endTurn()
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

export function setWord(G, ctx) {
  ctx.events.setActivePlayers({ others: 'clue', moveLimit: 1 })
  return { ...G, currentWord: G.words[ctx.turn - 1] }
}
export function submitClue(G, ctx, clue) {
  clue = String(clue).toUpperCase()
  if (G.clues[clue]) G.clues[clue] = -100
  else G.clues[clue] = 1
  if (Object.keys(ctx.activePlayers).length === 1)
    ctx.events.setActivePlayers({ others: 'validate', moveLimit: 1 })
  // return { ...G, clues: [...G.clues, clue] }
}
export function submitGuess(G, ctx, guess) {
  guess = String(guess).toUpperCase()
  if (guess === G.currentWord) {
    G.score++
    G.guesses[G.currentWord] = 'correct'
  } else {
    G.fails++
    G.guesses[G.words[13 - G.fails]] = 'deleted'
    G.guesses[G.currentWord] = 'incorrect'
  }
  nextTurn(G, ctx)
}
export function validateClue(G, ctx, votesArr) {
  Object.keys(G.clues).forEach(clue => {
    G.clues[clue] += votesArr[clue]
  })
  if (Object.keys(ctx.activePlayers).length === 1)
    ctx.events.setActivePlayers({ currentPlayer: { stage: 'guess', moveLimit: 1 } })
  // return { ...G, cluesVote: votesArr }
  // votesArr.forEach((clue, i) => (votesArr[i] = G.cluesVote[i] + clue))
  // return { ...G, cluesVote: votesArr }
}
