import dictionary from '../dictionary'
import {
  randomWords,
  submitClue,
  submitGuess,
  validateClue,
  stages,
  nextTurn,
  skipTurn,
} from './functions'

const JustOne = {
  setup: () => ({
    stage: stages,
    fails: 0,
    score: 0,
    words: randomWords(dictionary),
    currentWord: null,
    guesses: {},
    clues: {},
  }),

  // playerView: (G, ctx, playerID) => {
  //   return PlayerView.STRIP_SECRETS(G, playerID)
  // },

  moves: {
    submitClue,
    submitGuess,
    validateClue,
    nextTurn,
    skipTurn,
  },

  turn: {
    onBegin: (G, ctx) => {
      return { ...G, currentWord: G.words[ctx.turn] }
    },
    activePlayers: {
      others: { stage: 'clue', moveLimit: 1 },
    },
    stages: {
      clue: {
        moves: { submitClue },
        moveLimit: 1,
        next: { others: 'validate' },
      },
      validate: {
        moves: { validateClue },
        moveLimit: 1,
        next: { currentPlayer: 'guess' },
      },
      guess: {
        moves: { submitGuess, skipTurn, nextTurn },
        moveLimit: 1,
      },
    },
  },

  endIf: (G, ctx) => {
    if (ctx.turn > 1 - G.fails) {
      return `Game Over! Your team scored ${G.score} points out of a possible 13`
    }
  },
}

export default JustOne
