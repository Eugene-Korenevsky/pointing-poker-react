import React, { useState } from 'react';
import { Popup } from './popup';
import './mainPage.css';
import { isObsorverShow, isPopupAction } from './popup/popupSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createGameAction, IDGameAction } from './createGame.slice';
import { Controller } from '../../api/Controller';
import DeleteInfoPopup from './deleteInfoPopup';
import CancelGamePopup from './cancelGamePopup';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopup = useAppSelector((state) => state.popup.isPopup);
  const [isErrorID, setIsError] = useState(false);
  const id = useAppSelector((state) => state.createGame.id);
  const isKicked = useAppSelector((state) => state.user.kicked);
  const socket = useAppSelector((state) => state.socket.socket);
  const isCancelGamePopup = useAppSelector((state) => state.cancelGamePopup.isCancelGamePopup);

  function handleClickStart() {
    dispatch(isPopupAction(true));
    dispatch(isObsorverShow(false));
    dispatch(createGameAction(true));
  }
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(IDGameAction(event.target.value));
  }

  function handleClickConnect() {
    if (id) {
      Controller.checkRoom(socket, id).then((responseObject) => {
        if (responseObject.status === 200) {
          dispatch(createGameAction(false));
          dispatch(isPopupAction(true));
          dispatch(isObsorverShow(true));
          setIsError(false);
        } else {
          setIsError(true);
        }
      });
    } else {
      setIsError(true);
    }
  }

  return (
    <section className="main-page">
      <h1 className="main-page__title">
        Poker <span className="main-page__title_under">Planning</span>
      </h1>

      <h2 className="main-page__subtitle main-page__subtitle_start">Start your planning:</h2>
      <div className="main-page__wrap">
        <p className="main-page__label">Create session:</p>
        <button className="main-page__button" onClick={handleClickStart}>
          Start new game
        </button>
      </div>

      <h2 className="main-page__subtitle main-page__subtitle_or">OR:</h2>
      <p className="main-page__label">
        Connect to lobby by <span className="main-page__label_id">ID</span>:
      </p>
      {isErrorID && <p className="main-page__input-error">Please enter correct ID</p>}

      <div className="main-page__wrap">
        <input className="main-page__input" type="numtextber" value={id} onChange={handleInput} />
        <button className="main-page__button" onClick={handleClickConnect}>
          Connect
        </button>
      </div>
      {isPopup && <Popup></Popup>}
      {isKicked && <DeleteInfoPopup />}
      {isCancelGamePopup && <CancelGamePopup />}
    </section>
  );
}
