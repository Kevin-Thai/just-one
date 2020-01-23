import dictionary from '../dictionary'

const randomWords = arr => {
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

const JustOne = {
  name: 'just-one',

  setup: () => ({
    players: [],
    guesser: null,
    turns: 13,
    score: 0,
    words: randomWords(dictionary),
    currentWord: null,
    guess: null,
    clues: [],
    cluesVote: [],
  }),

  moves: {
    submitClue(G, ctx, clue) {
      clue = String(clue).toUpperCase()
      console.log(clue, 'submit clue')
      return { ...G, clues: [...G.clues, clue] }
    },
    submitGuess(G, ctx, guess) {
      guess = String(guess).toUpperCase()
      console.log(guess, 'guess')
      return { ...G, guess }
    },
    validateClue(G, ctx, votesArr) {
      console.log(votesArr, 'voting')
      votesArr.forEach((clue, i) => (votesArr[i] = G.cluesVote[i] + clue))
      return { ...G, cluesVote: votesArr }
    },
  },

  turn: {
    stages: {
      draw: {
        onBegin: G => (G.currentWord = G.words.pop()),
      },
      clue: {
        moves: ['submitClue'],
        onBegin: G => (G.clues = []),
        endIf: G => G.clues.length === G.players.length - 1,
        next: '',
      },
    },
  },

  endIf: (G, ctx) => {
    if (G.turns <= 0) {
      return `Game Over! Your team scored ${G.score} points out of a possible 13`
    }
  },
}

export default JustOne
