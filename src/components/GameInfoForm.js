import React from 'react'

const GameInfoForm = props => {
  return (
    <div>
      <form>
        <label>Enter a Room Name</label>
        <input
          type="text"
          name="gameID"
          value={props.tempGameID}
          onChange={props.handleChange}
          autoComplete="off"
        />
      </form>
      <div>
        <button onClick={() => props.handleSubmit('0')}>Player 0</button>
        <button onClick={() => props.handleSubmit('1')}>Player 1</button>
        <button onClick={() => props.handleSubmit('2')}>Player 2</button>
        <button onClick={() => props.handleSubmit('3')}>Player 3</button>
        <button onClick={() => props.handleSubmit('4')}>Player 4</button>
        <button onClick={() => props.handleSubmit('5')}>Player 5</button>
        <button onClick={() => props.handleSubmit('6')}>Player 6</button>
      </div>
    </div>
  )
}

export default GameInfoForm
