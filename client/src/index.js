import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router } from 'react-router-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Lobby from './components/Lobby'
import history from './history'

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route path="/:game/:id/:secret" component={App} />
      <Route exact path="/" component={Lobby} />
    </div>
  </Router>,
  document.getElementById('root')
)
serviceWorker.unregister()
