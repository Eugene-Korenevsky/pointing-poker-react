import React from 'react';
import coffee from '../../../assets/coffee.png';
import './gameCard.css';

export default function GameCard(props: { value: string; scopeTypeShort: string; statistic?: boolean }): JSX.Element {
  return (
    <div className={props.statistic ? 'game-card game-card_statistic' : 'game-card'}>
      <span className={props.statistic ? 'game-card__type game-card__type_statistic' : 'game-card__type'}>
        {props.scopeTypeShort}
      </span>
      {props.value === 'coffee' ? <img src={coffee} alt="df" className="game-card__img" /> : props.value}
      <span className={props.statistic ? 'game-card__type game-card__type_statistic' : 'game-card__type'}>
        {props.scopeTypeShort}
      </span>
    </div>
  );
}
