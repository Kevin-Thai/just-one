import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default props => {
  const getStage = id => {
    if (props.ctx.currentPlayer === id) return 'GUESSER'
    switch (props.ctx.activePlayers[id]) {
      case 'clue':
        return 'Entering clue'
      case 'validate':
        return 'Validating clues'
      default:
        return 'Waiting...'
    }
  }

  const currentPlayer = id => {
    return props.playerID === id
  }

  return (
    <Container fluid={true}>
      <Row>
        {Object.keys(props.names).map(nameId => (
          <Col key={'name-' + nameId} className={currentPlayer(nameId) ? 'current-player' : ''}>
            {/* {props.names[nameId] + (currentPlayer(nameId) ? ' (You)' : '')} */}
            {props.names[nameId]}
          </Col>
        ))}
      </Row>
      <Row>
        {Object.keys(props.names).map(nameId => (
          <Col key={'stage-' + nameId} className={currentPlayer(nameId) ? 'current-player' : ''}>
            {getStage(nameId)}
          </Col>
        ))}
      </Row>
    </Container>
  )
}
