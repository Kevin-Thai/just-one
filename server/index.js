import { Server, FlatFile } from 'boardgame.io/server'
import JustOne from '../client/src/components/Game'
import Router from 'koa-router'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import request from 'superagent'
// import uuidv4 from 'uuid/v4'

const app = new Koa()
const staticApp = new Koa()
const router = new Router()
const PORT = process.env.PORT || 8000
const API_PORT = 8001
const INTERNAL_API_PORT = 8002
app.use(cors())

const server = Server({ games: [JustOne] })
staticApp.use(serve('../client/build/index.html'))
app.use(mount('/', staticApp))

// router.get('*', function(request, response) {
//   response.sendFile('../client/build/index.html')
// })

router.get('/players/:id', async ctx => {
  const gameID = ctx.params.id
  const r = await request.get(
    `http://localhost:${INTERNAL_API_PORT}/games/${JustOne.name}/${gameID}`
  )
  ctx.body = r.body
})

router.post('/create', koaBody(), async ctx => {
  const r = await request
    .post(`http://localhost:${INTERNAL_API_PORT}/games/${JustOne.name}/create`)
    .send({
      numPlayers: ctx.request.body.players,
    })

  const gameName = JustOne.name
  const gameId = r.body.gameID

  const credentials = []

  for (let i = 0; i < ctx.request.body.players; i++) {
    const j = await request
      .post(`http://localhost:${INTERNAL_API_PORT}/games/${JustOne.name}/${gameId}/join`)
      .send({
        playerID: i,
        playerName: ctx.request.body.names[i],
      })

    credentials.push(j.body.playerCredentials)
  }

  ctx.body = {
    game: gameId,
    credentials,
  }
})

const serverHandle = server.run({
  port: PORT,
  callback: () => {
    console.log(`Serving at: http://localhost:${PORT}/`)
  },
  lobbyConfig: {
    apiPort: INTERNAL_API_PORT,
    apiCallback: () => {
      console.log(`Internal API serving at http://localhost:${INTERNAL_API_PORT}`)
    },
  },
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(API_PORT, () => {
  console.log(`API serving at: http://localhost:${API_PORT}/`)
})

export { app, server, serverHandle }
