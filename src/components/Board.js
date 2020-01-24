import React from 'react'
import PropTypes from 'prop-types'
import GuesserBoard from './GuesserBoard'
import ClueBoard from './ClueBoard'

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    events: PropTypes.any.isRequired,
  }

  render() {
    console.log(this.props, 'props')

    return (
      <div className="board">
        {this.props.playerID === this.props.ctx.currentPlayer ? (
          <GuesserBoard {...this.props} />
        ) : (
          <ClueBoard {...this.props} />
        )}
      </div>
    )
  }
}

export default Board
