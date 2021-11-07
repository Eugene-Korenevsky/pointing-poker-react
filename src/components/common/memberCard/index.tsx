import React from 'react';
import { MemberCardKind } from '../../../model/MemberCardKind';
import { UserRole } from '../../../model/UserRole';
import ImageBlock from './ImageBlock';
import './member.css';
import playerLogoI from '../../../assets/playerLogo.svg';
import { User } from '../../../model/User';
import { useAppSelector } from '../../../app/hooks';
import { Controller } from '../../../api/Controller';
import YesNoDialog from '../common-dialogs/YesNoDialog';

export interface MemberCardProps {
  user: User;
  kind: MemberCardKind;
  classList?: string[];
}

export default function MemberCard(props: MemberCardProps): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const socket = useAppSelector((state) => state.socket.socket);
  const [open, setOpen] = React.useState(false);
  let classes = '';

  if (props.classList) {
    props.classList.forEach((item) => {
      classes += ` ${item}`;
    });
  }

  const openDialog = (): void => {
    setOpen(true);
  };

  const closeDialog = (): void => {
    setOpen(false);
  };

  const kickPlayer = () => {
    Controller.deleteUser(socket, props.user.id);
    setOpen(false);
  };

  const playerLogo: JSX.Element = (
    <img
      src={playerLogoI}
      alt="player logo"
      className={props.kind === MemberCardKind.SIMPLE ? 'member__simple-user-logo' : 'member__chat-user-logo'}
    ></img>
  );
  const kickButton: JSX.Element = (
    <button
      onClick={openDialog}
      className={
        props.kind === MemberCardKind.SIMPLE ? 'member__simple-user-kick-button' : 'member__chat-user-kick-button'
      }
      title="kick player"
    >
      {playerLogo}
    </button>
  );

  const simpleCard: JSX.Element = (
    <div className={`simple-member-wrapper ${classes}`}>
      <ImageBlock
        kind={props.kind}
        name={props.user.name}
        surname={props.user.surname}
        image={props.user.image}
      ></ImageBlock>
      <div className="member-info-block-wrap">
        <div className="member__simple-member-info-block">
          <div className="member-info-block__simple-current-user">
            {props.user.id === user.user.id ? 'IT`S YOU' : ''}
          </div>
          <div className="member-info-block__simple-name">{`${props.user.name} ${props.user.surname}`}</div>
          <div className="member-info-block__simple-position">{props.user.jobPosition}</div>
        </div>
        <div className="member__simple-image-wrapper">
          {user.user.role === UserRole.DEALER && props.user.role === UserRole.PLAYER ? kickButton : ''}
          <YesNoDialog
            content={`Do you really want to kick ${props.user.name} ${props.user.surname}`}
            open={open}
            yesClickHandle={kickPlayer}
            noClickHandle={closeDialog}
            title={'Kick player?'}
          ></YesNoDialog>
        </div>
      </div>
    </div>
  );

  const chatCard: JSX.Element = (
    <div className={`chat-member-wrapper ${classes}`}>
      <ImageBlock
        kind={props.kind}
        name={props.user.name}
        surname={props.user.surname}
        image={props.user.image}
      ></ImageBlock>
      <div className="member-info-block-wrap">
        <div className="member__chat-member-info-block">
          <div className="member-info-block__chat-current-user">IT`S YOU</div>
          <div className="member-info-block-wrap">
            <div className="member-info-block__chat-name">{`${props.user.name} ${props.user.surname}`}</div>
            <div className="member-info-block__chat-position">{props.user.jobPosition}</div>
          </div>
        </div>
        <div className="member__chat-image-wrapper">
          {user.user.role === UserRole.DEALER && props.user.role === UserRole.PLAYER ? kickButton : ''}
          <YesNoDialog
            content={'Kick player'}
            open={open}
            yesClickHandle={kickPlayer}
            noClickHandle={closeDialog}
            title={`Do you really want to kick ${props.user.name} ${props.user.surname}`}
          ></YesNoDialog>
        </div>
      </div>
    </div>
  );

  const card: JSX.Element = props.kind === MemberCardKind.SIMPLE ? simpleCard : chatCard;

  return card;
}
