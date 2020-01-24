import dictionary from '../dictionary'
// import { ActivePlayers, Stage, PlayerView } from 'boardgame.io/core'
import {
  randomWords,
  setWord,
  submitClue,
  submitGuess,
  validateClue,
  stages,
  nextTurn,
} from './functions'

const JustOne = {
  setup: () => ({
    // stage: stages[0],
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
    setWord,
    submitClue,
    submitGuess,
    validateClue,
    nextTurn,
  },

  turn: {
    activePlayers: {
      currentPlayer: { stage: 'draw', moveLimit: 1 },
    },
    stages: {
      draw: {
        moves: { setWord },
        next: { others: 'clue' },
      },
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
        moves: { submitGuess, nextTurn },
        moveLimit: 1,
      },
    },
  },

  endIf: (G, ctx) => {
    if (ctx.turn > 13 - G.fails) {
      return `Game Over! Your team scored ${G.score} points out of a possible 13`
    }
  },
}

export default JustOne
