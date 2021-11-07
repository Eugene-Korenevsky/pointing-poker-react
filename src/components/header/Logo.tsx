import React from 'react';
import './header.css';
import whiteP from '../../assets/P.svg';
import greenP from '../../assets/P-green.svg';

export default function Logo(): JSX.Element {
  return <div className="logo-wrapper">
    <img src={whiteP} className="logo__white-p" alt="white letter P" />
    <img src={greenP} className="logo__green-p" alt="green letter P" />
  </div>
}