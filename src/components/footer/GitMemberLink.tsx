import React from 'react';
import gitHubLogo from '../../assets/github-logo.png';
import './footer.css';

export interface GitMemberLinkProps {
  gitLink: string
  name: string
  surname: string
  title: string
}

export default function GitMemberLink(props: GitMemberLinkProps): JSX.Element {
  return <li className="footer__git-member-li" title={props.title}>
    <a className="footer__git-member-link" href={props.gitLink}>
      <div className="logo-background">
        <img src={gitHubLogo} className="footer__git-logo" alt="rsschool logo" />
      </div>
      {
        `${props.name} ${props.surname}`
      }
    </a>
  </li>
}