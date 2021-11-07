import React from 'react';
import './checker.css';

export function Checker(props: { stateName: boolean; setState: (arg0: boolean) => void }): JSX.Element {
  return (
    <div
      className={props.stateName ? 'cheker cheker_active' : 'cheker'}
      onClick={() => props.setState(!props.stateName)}
    ></div>
  );
}
