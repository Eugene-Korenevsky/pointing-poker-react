import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IDGameAction } from '../mainPage/createGame.slice';

export default function ConnectRout(): JSX.Element {
  const history = useHistory();
  const { pathname } = history.location;
  const roomID = pathname.split('connect/')[1];
  const inputID = useAppSelector((state) => state.createGame.id);

  const dispatch = useAppDispatch();
  dispatch(IDGameAction(roomID));

  useEffect(() => {
    history.push('/');
  }, [inputID]);

  return <></>;
}
