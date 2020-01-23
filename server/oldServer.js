// const path = require('path')
// const express = require('express')
// const Server = require('boardgame.io/server').Server
// // const JustOne = require('../src/components/Game')
// const dictionary = require('../src/dictionary')

// // import path from 'path'
// // import express from 'express'
// // import {Server} from 'boardgame.io/server'
// // import JustOne from '../src/components/Game'
// // import dictionary from './dictionary'

// const PORT = process.env.PORT || 8000

// const app = express()
// const server = require('http').createServer(app)
// const io = (module.exports.io = require('socket.io')(server, {
//   pingInterval: 2000,
// }))

// const shuffle = arr => {
//   let i = arr.length,
//     temp,
//     randomI
//   while (i > 0) {
//     randomI = Math.floor(Math.random() * i)
//     i -= 1
//     temp = arr[i]
//     arr[i] = arr[randomI]
//     arr[randomI] = temp
//   }
//   return arr.slice(0, 13)
// }

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '..', 'public')))
// app.get('/api/dictionary', (req, res, next) => {
//   try {
//     res.json(shuffle(dictionary))
//   } catch (error) {
//     console.error(error, 'There was an error loading the dictionary')
//   }
// })

// const gameServer = Server({
//   games: [JustOne],
// })

// // io.on('connection', )
// app.listen(PORT, () => {
//   console.log(`Games running on port ${PORT}`)
// })
