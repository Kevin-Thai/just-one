import React from 'react'
import { CardHeader, Card } from 'reactstrap'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Router } from 'react-router-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Lobby from './components/Lobby'
import history from './history'
import logo from './JustOne-Logo.png'

ReactDOM.render(
  <Router history={history}>
    <div>
      <Card>
        <CardHeader className="header">
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </CardHeader>
        <Route path="/:game/:id/:secret" component={App} />
        <Route exact path="/" component={Lobby} />
      </Card>
    </div>
  </Router>,
  document.getElementById('root')
)
serviceWorker.unregister()
