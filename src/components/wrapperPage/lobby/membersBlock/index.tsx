import React from 'react';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import { User } from '../../../../model/User';
import { UserRole } from '../../../../model/UserRole';
import MemberCard from '../../../common/memberCard';
import './members-block.css';

export interface MemberBlockProps {
  members: User[]
}

export default function MembersBlock(props: MemberBlockProps): JSX.Element {

  const membersItems: JSX.Element[] = [];

  for (let i = 0; i < props.members.length; i++) {
    if (props.members[i].role === UserRole.PLAYER) {
      membersItems.push(<MemberCard key={i} kind={MemberCardKind.SIMPLE}
        classList={["members-block__members-item"]} user={props.members[i]}></MemberCard>)
    }
  }

  return <div className="members-block">
    <h2 className="common-title">Members:</h2>
    <div className="common-card-block">
      {
        membersItems
      }
    </div>
  </div>
}