import React, { useState } from 'react'
import { Container, Form, Input, Button } from 'reactstrap'

const Chat = props => {
  const [message, setMessage] = useState('')

  const handleChange = evt => {
    setMessage(evt.target.value)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    props.moves.chatSubmit(`${props.name}: ${message}`)
    setMessage('')
  }
  return (
    <div className="chat">
      <Container>
        {props.G.chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </Container>
      <Form inline onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            name="msg"
            disabled={Object.values(props.ctx.activePlayers).includes('clue')}
            value={message}
            onChange={handleChange}
            required
            maxLength="75"
            autoComplete="off"
          />
          <Button
            color="success"
            disabled={!message || Object.values(props.ctx.activePlayers).includes('clue')}>
            {Object.values(props.ctx.activePlayers).includes('clue') ? 'Disabled' : 'Enter'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Chat
