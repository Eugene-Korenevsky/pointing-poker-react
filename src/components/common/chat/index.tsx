import React from 'react';
import { Paper } from '@material-ui/core';
import { MessageLeft, MessageRight } from './message/MessageLeft';
import { TextInput } from './textInput/TextInput';
import { useAppSelector } from '../../../app/hooks';
import { User } from '../../../model/User';
import './chat.css';

export interface Message {
  id: number;
  user: User;
  message: string;
}

interface ChatProps {
  messages: Message[];
}

export default function Chat(props: ChatProps): JSX.Element {
  const currentUser = useAppSelector((state) => state.user.user);
  const messages = [...props.messages];
  return (
    <Paper className="chat-paper">
      <Paper id="style-1" className="messages-body">
        {messages.map((elem) => {
          if (elem.user.id === currentUser.id) {
            return <MessageRight key={`${elem.id}`} message={elem.message} user={elem.user} />;
          }
          return <MessageLeft key={elem.id} message={elem.message} user={elem.user} />;
        })}
      </Paper>
      <TextInput />
    </Paper>
  );
}
