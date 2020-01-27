import { PlayerView } from 'boardgame.io/core'
import dictionary from '../dictionary'
import {
  randomWords,
  submitClue,
  submitGuess,
  validateClue,
  stages,
  skipTurn,
  endTurn,
  chatSubmit,
} from './functions'

const JustOne = {
  name: 'just-one',
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
    chat: [],
  }),

  playerView: PlayerView.STRIP_SECRETS,

  moves: {
    submitClue,
    submitGuess,
    validateClue,
    skipTurn,
    endTurn,
    chatSubmit,
  },

  turn: {
    onBegin: (G, ctx) => {
      return { ...G, currentWord: G.words[ctx.turn] }
    },
    activePlayers: {
      others: { stage: 'clue' },
    },
    stages: {
      clue: {
        moves: { submitClue, chatSubmit },
        // moveLimit: 1,
        next: { others: 'validate' },
      },
      validate: {
        moves: { validateClue, chatSubmit },
        // moveLimit: 1,
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
      return { ...G, clues: {}, currentWord: null, result: null, guess: null, chat: [] }
    },
  },

  endIf: (G, ctx) => {
    if (ctx.turn > 13 - G.fails) {
      return `Game Over! Your team scored ${G.score}/13 points`
    }
  },
}

export default JustOne
