import React, { useState, useRef } from 'react'
import { Container, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap'

const Chat = props => {
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  const handleChange = evt => {
    setMessage(evt.target.value)
  }

  const handleSubmit = evt => {
    props.moves.chatSubmit(`${props.name}: ${message}`)
    setMessage('')
  }

  const onEnter = evt => {
    if (evt.key === 'Enter') handleSubmit()
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // useEffect(scrollToBottom, [props.G.chat])

  return (
    <div className="chat">
      <Container className="chat-container">
        {props.G.chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
        <div ref={messagesEndRef} />
      </Container>
      <InputGroup>
        <Input
          type="text"
          name="msg"
          className="wide"
          disabled={Object.values(props.ctx.activePlayers).includes('clue')}
          value={message}
          onChange={handleChange}
          required
          maxLength="75"
          autoComplete="off"
          onKeyPress={onEnter}
        />
        <InputGroupAddon addonType="append">
          <Button
            color="success"
            onClick={handleSubmit}
            disabled={!message || Object.values(props.ctx.activePlayers).includes('clue')}>
            {Object.values(props.ctx.activePlayers).includes('clue') ? 'Disabled' : 'Enter'}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default Chat
