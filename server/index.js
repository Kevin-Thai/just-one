const Server = require('boardgame.io/server').Server
const JustOne = require('../src/components/Game')
const server = Server({ games: [JustOne] })
server.run(8000, () => console.log('Server running on port 8000'))
