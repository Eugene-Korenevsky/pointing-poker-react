import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import coffee from '../../../assets/coffee.png';
import chosenIcon from '../../../assets/chosen-icon.svg';
import './play-card.css';
import { setChosenValue } from '../../../slices/GameSlice';
import { Controller } from '../../../api/Controller';

export default function PlayCards(): JSX.Element {
  const scopeTipeShort = useAppSelector((state) => state.game.room.gameSettings.scopeTipeShort);
  const values = useAppSelector((state) => state.game.room.gameSettings.cardValues);
  const chosenValue = useAppSelector((state) => state.game.memberVote.chosenValue);
  const socket = useAppSelector((state) => state.socket.socket);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onClickHandler = (value: string) => {
    dispatch(setChosenValue(value));
    Controller.sendUserVote(socket, user.user.id, value);
  };

  return (
    <div className="setting-card-wrap">
      {values &&
        values.map((el, index) => (
          <div className="setting__card-value-vote-wrapper" key={index}>
            <div className="setting__card-value-vote" onClick={() => onClickHandler(el)}>
              <span className="setting__card-value-type">
                {el === 'coffee' || el === '?' || el === '∞' ? '' : scopeTipeShort}
              </span>
              {el === 'coffee' ? <img src={coffee} alt="df" className="setting__card-value-img" /> : el}
              <span className="setting__card-value-type">
                {el === 'coffee' || el === '?' || el === '∞' ? '' : scopeTipeShort}
              </span>
            </div>
            {el === chosenValue ? (
              <div className="setting__card-value-vote-chosen">
                <div className="setting__card-value-vote-chosen-icon">
                  <img src={chosenIcon} alt="your choose" className="setting__chosen-card-value-img" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
    </div>
  );
}
