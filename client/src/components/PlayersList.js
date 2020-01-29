import React from 'react'
import { Table } from 'reactstrap'

export default props => {
  const getStage = id => {
    if (props.ctx.currentPlayer === id) return 'GUESSER'
    switch (props.ctx.activePlayers[id]) {
      case 'clue':
        return 'Entering clue'
      case 'validate':
        return 'Validating clues'
      default:
        return 'Now waiting...'
    }
  }

  return (
    <Table>
      <tbody>
        {Object.keys(props.names).map(nameId => (
          <tr key={nameId}>
            <td className={props.playerID === nameId ? 'current-player' : ''}>
              {props.names[nameId]}
            </td>
            <td className={props.playerID === nameId ? 'current-player' : ''}>
              {getStage(nameId)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
