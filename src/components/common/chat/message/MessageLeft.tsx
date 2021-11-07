import React from 'react';
import { Avatar } from '@material-ui/core';
import { User } from '../../../../model/User';
import './message.css';

interface MessageProps {
  message: string;
  user: User;
}

export function MessageLeft(props: MessageProps): JSX.Element {
  return (
    <div>
      <Avatar alt={props.user.name} src={props.user.image}></Avatar>
      <div className="message-row">
        <div className="display-name">{props.user.name}</div>
        <div className="message-blue">
          <div>
            <p className="message-content">{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessageRight(props: MessageProps): JSX.Element {
  return (
    <div>
      <div>
        <div className="message-row-right">
          <div className="message-orange">
            <p className="message-content">{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
