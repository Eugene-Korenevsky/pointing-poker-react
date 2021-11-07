import React from 'react';
import './footer.css';
import rsLogo from '../../assets/rs_school_js.svg';
import FooterNav from './FooterNav';

export default function Footer(): JSX.Element {
  return <div className="footer">
    <div className="footer__first-line"></div>
    <div className="footer__second-line">
      <div className="footer-nav-wrapper">
        <a className="footer__rs-link" href="https://rs.school/react/">
          <img src={rsLogo} className="footer__rs-logo" alt="rsschool logo" />
        </a>
        <FooterNav />
        <div className="footer__year">2021</div>
      </div>

    </div>
  </div>
}