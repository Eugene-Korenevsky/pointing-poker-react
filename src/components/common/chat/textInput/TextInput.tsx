import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './textInput.css';
import { useAppSelector } from '../../../../app/hooks';
import { Controller } from '../../../../api/Controller';

export function TextInput(): JSX.Element {
  const socket = useAppSelector((state) => state.socket.socket);
  const user = useAppSelector((state) => state.user.user);
  const [message, setMessage] = useState('');

  const sendMessageHandler = () => {
    Controller.sendMessage(socket, user.id, message);
  };

  return (
    <>
      <form className="wrap-form" noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Your message"
          className="wrap-text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" className="send-message-button" onClick={sendMessageHandler}>
          <SendIcon />
        </Button>
      </form>
    </>
  );
}
