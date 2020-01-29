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
    // <Table>
    //   <tbody>
    //     <tr>
    //       {Object.keys(props.names).map(nameId => (
    //         <td key={'name-' + nameId} className={currentPlayer(nameId) ? 'current-player' : ''}>
    //           {props.names[nameId] + (currentPlayer(nameId) ? ' (You)' : '')}
    //         </td>
    //       ))}
    //     </tr>
    //     <tr>
    //       {Object.keys(props.names).map(nameId => (
    //         <td key={'stage-' + nameId} className={currentPlayer(nameId) ? 'current-player' : ''}>
    //           {getStage(nameId)}
    //         </td>
    //       ))}
    //     </tr>
    //   </tbody>
    // </Table>
    <Container fluid={true}>
      <Row>
        {Object.keys(props.names).map(nameId => (
          <Col key={'name-' + nameId} className={currentPlayer(nameId) ? 'current-player' : ''}>
            {props.names[nameId] + (currentPlayer(nameId) ? ' (You)' : '')}
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
