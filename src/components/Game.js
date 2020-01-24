import dictionary from '../dictionary'
import { ActivePlayers, Stage, PlayerView } from 'boardgame.io/core'

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

function setWord(G, ctx) {
  ctx.events.setActivePlayers({ others: 'clue', moveLimit: 1 })
  console.log('word set')

  return { ...G, currentWord: G.words[G.turns - 1] }
}
function submitClue(G, ctx, clue) {
  console.log(clue, 'submit clue')
  clue = String(clue).toUpperCase()
  return { ...G, clues: [...G.clues, clue] }
}
function submitGuess(G, ctx, guess) {
  guess = String(guess).toUpperCase()
  guess === G.currentWord ? G.score++ : G.turns--
  G.turns--
  G.currentWord = null
  G.clues = []
  G.cluesVote = {}
  ctx.events.endTurn()
}
function validateClue(G, ctx, votesArr) {
  console.log(votesArr, 'voting')
  votesArr.forEach((clue, i) => (votesArr[i] = G.cluesVote[i] + clue))
  return { ...G, cluesVote: votesArr }
}

const JustOne = {
  name: 'just-one',

  setup: () => ({
    // players: [],
    // guesser: null,
    turns: 1,
    score: 0,
    words: randomWords(dictionary),
    currentWord: null,
    guess: null,
    clues: [],
    cluesVote: {},
  }),

  // playerView: (G, ctx, playerID) => {
  //   return PlayerView.STRIP_SECRETS(G, playerID)
  // },

  moves: {
    setWord,
    submitClue,
    submitGuess,
    validateClue,
  },

  // phases: {
  //   setWord: {
  //     moves: {},
  //     onBegin: (G, ctx) => (G.currentWord = G.words.pop()),
  //     endIf: G => G.currentWord,
  //     next: 'submitClue',
  //     start: true,
  //   },
  //   submitClue: {
  //     moves: ['submitClue'],
  //     onBegin: G => (G.clues = []),
  //     endIf: G => G.clues.length === G.players.length - 1,
  //     next: '',
  //   },
  // },

  turn: {
    activePlayers: {
      currentPlayer: { stage: 'draw', moveLimit: 1 },
    },
    stages: {
      draw: {
        moves: { setWord },
      },
      clue: {
        moves: { submitClue },
        next: 'validate',
      },
      validate: {
        moves: { validateClue },
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
