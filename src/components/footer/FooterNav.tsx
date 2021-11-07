import React from 'react';
import GitMemberLink from './GitMemberLink';
import members from '../../properties/members.json';

export default function FooterNav(): JSX.Element {
  const membersItems:JSX.Element[] = [];
  for(let i = 0; i < 4; i++) {
    membersItems.push(<GitMemberLink key={i} name={members[i].name} surname={members[i].surname}
      gitLink={members[i].gitLink} title={members[i].tittle}></GitMemberLink> )
  }
  return <nav className="footer__members-navigation">
    <ul className="footer__members">
      { membersItems }
    </ul>
  </nav>
}