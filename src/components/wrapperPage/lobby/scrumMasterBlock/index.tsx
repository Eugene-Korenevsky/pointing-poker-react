import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import { useButtonStyles } from '../../../../styles/ButtonStyles';
import { UserRole } from '../../../../model/UserRole';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { changeGameState, initialState, setFullData, setSettings } from '../../../../slices/GameSlice';
import { GameState, Room } from '../../../../model/Room';
import { Controller } from '../../../../api/Controller';
import YesNoDialog from '../../../common/common-dialogs/YesNoDialog';
import { resetSettingsAction } from '../settingsBlock/settingBlog.slice';
import { IDGameAction } from '../../../mainPage/createGame.slice';
import { cancelGamePopupAction } from '../../../mainPage/cancelGamePopup/cancelGamePopup.slice';

export default function ScrumMasterBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const roomId = useAppSelector((state) => state.createGame.id);
  const user = useAppSelector((state) => state.user);
  const settings = useAppSelector((state) => state.gameSettings);
  const game = useAppSelector((state) => state.game);
  const socket = useAppSelector((state) => state.socket.socket);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [copyVisible, setCopyVisible] = useState<boolean>(false);
  const classes = useButtonStyles();
  const domain = window.location.origin;
  const adress = `${domain}/#/connect/${game.room.roomID}`;
  const [isCreateGameError, setIsCreateGameError] = useState(false);
  const [createGameErrorMessage, setCreateGameErrorMessage] = useState('');

  useEffect(() => {
    socket.on('cancelGame', () => {
      dispatch(resetSettingsAction());
      dispatch(IDGameAction(''));
      dispatch(setFullData(initialState));
      localStorage.removeItem('roomID');
      localStorage.removeItem('userID');
      history.push(`/`);
      dispatch(cancelGamePopupAction(true));
    });
  }, [socket]);

  useEffect(() => {
    if (game.room.issues.length && settings.cardValues.length) {
      setIsCreateGameError(false);
    }
  }, [game.room.issues, settings.cardValues]);

  const cancelGame = (): void => {
    Controller.deleteRoom(socket, roomId).then((response) => {
      if (response.status !== 200) {
        console.log(response.message);
      } else {
        console.log('room was deleted');
      }
    });
  };

  const copyHandler = (): void => {
    navigator.clipboard.writeText(adress);
    setCopyVisible(true);
    setTimeout((): void => {
      setCopyVisible(false);
    }, 1500);
  };

  const startGame = (): void => {
    if (game.room.issues.length && settings.cardValues.length) {
      dispatch(changeGameState(GameState.PLAYING));
      dispatch(setSettings(settings));
      const room: Room = {
        roomID: game.room.roomID,
        name: game.room.name,
        state: GameState.PLAYING,
        issues: game.room.issues,
        gameSettings: settings,
        members: game.room.members,
      };
      Controller.updateRoom(socket, room);
    } else {
      setIsCreateGameError(true);
      if (!game.room.issues.length && !settings.cardValues.length) {
        setCreateGameErrorMessage('Please create issue and add card value');
      } else if (!game.room.issues.length) {
        setCreateGameErrorMessage('Please create issue');
      } else {
        setCreateGameErrorMessage('Please add card value');
      }
    }
  };

  const exitGame = (): void => {
    Controller.deleteUser(socket, user.user.id);
    setOpen(false);
    history.push(`/`);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="scrum-master">
      <h5 className="scrum-master__title">Scram master:</h5>
      <MemberCard kind={MemberCardKind.SIMPLE} user={game.dealer}></MemberCard>
      {user.user.role === UserRole.DEALER ? (
        <div className="scrum-master__label-block">
          <h2 className="scrum-master__label-block__label">Label:</h2>
          <div className="scrum-master__label-block__input-block">
            <h3 className="scrum-master__label-block__input-block-input" title={adress}>
              {adress}
            </h3>
            <Button className={`${classes.blueButton}`} onClick={copyHandler} variant="contained" color="primary">
              Copy
            </Button>
            <div className={`scrum-master__label-block__input-block-copied ${copyVisible ? '' : 'hidden'}`}>
              Copied!
            </div>
          </div>
        </div>
      ) : (
        <div className="scrum-master__no-label-block"></div>
      )}
      {
        <div className="scrum-master__start-exit-buttons-wrapper">
          {isCreateGameError && <p className="scrum-master__issue-error">{createGameErrorMessage}</p>}
          {user.user.role === UserRole.DEALER ? (
            <Button className={classes.blueButton} onClick={startGame} variant="contained" color="primary">
              Start Game
            </Button>
          ) : (
            <div></div>
          )}
          {user.user.role === UserRole.DEALER ? (
            <Button
              className={`${classes.whiteButton} ${classes.marginButton}`}
              onClick={cancelGame}
              variant="contained"
              color="primary"
            >
              Cancel Game
            </Button>
          ) : (
            <Button
              className={`${classes.whiteButton} ${classes.marginButton}`}
              onClick={openDialog}
              variant="contained"
              color="primary"
            >
              Exit
            </Button>
          )}
        </div>
      }
      <YesNoDialog
        content={`Do you really want to exit game?`}
        open={open}
        yesClickHandle={exitGame}
        noClickHandle={closeDialog}
        title={'Exit game?'}
      ></YesNoDialog>
    </div>
  );
}
