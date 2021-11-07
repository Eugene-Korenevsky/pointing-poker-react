import React from 'react';
import './header.css';
import Logo from './Logo';

export default function Header(): JSX.Element {
  return <div className="header">
    <div className="header__first-line"></div>
    <div className="header__second-line"></div>
    <div className="header-logo-wrapper">
      <Logo></Logo>
    </div>
  </div>
}