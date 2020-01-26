import dictionary from '../dictionary'
import {
  randomWords,
  submitClue,
  submitGuess,
  validateClue,
  stages,
  skipTurn,
  endTurn,
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
    guess: null,
    result: null,
  }),

  // playerView: (G, ctx, playerID) => {
  //   return PlayerView.STRIP_SECRETS(G, playerID)
  // },

  moves: {
    submitClue,
    submitGuess,
    validateClue,
    skipTurn,
    endTurn,
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
        moves: { submitGuess, skipTurn },
        moveLimit: 1,
      },
      results: {
        moves: { endTurn },
        moveLimit: 1,
      },
    },
    onEnd: (G, ctx) => {
      return { ...G, clues: {}, currentWord: null, result: null, guess: null }
    },
  },

  endIf: (G, ctx) => {
    if (ctx.turn > 13 - G.fails) {
      return `Game Over! Your team scored ${G.score}/13 points`
    }
  },
}

export default JustOne
