import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import { MemberVoteStatus, MemberVoteTicket } from '../../../../model/MemberVote';
import { Room } from '../../../../model/Room';
import { VoteUtil } from '../../../../utils/VoteUtil';
import MemberCard from '../../../common/memberCard';
import './vote-block.css';
import VoteResultCard from './VoteResultCard';

export default function VoteBlock(): JSX.Element {
  const membersVote = useAppSelector((state) => state.game.memberVote);
  const members = useAppSelector((state) => state.game.room.members);
  const settings = useAppSelector((state) => state.game.room.gameSettings);
  const shortType = useAppSelector((state) => state.game.room.gameSettings.scopeTipeShort);
  const socket = useAppSelector((state) => state.socket.socket);

  useEffect(() => {
    socket.on("getVoteResults", (roomObj): void => {
      console.log(roomObj.memberVote.status);
    })
  }, [socket]);

  const membersVoteResult = VoteUtil.getVoteResult(members, shortType, membersVote.status, settings, membersVote.memberVoteResult);

  return <div className="vote-block">
    <section className="vote-block__section">
      <h2 className="vote-block__section-title">Score:</h2>
      <ul>
        {
          membersVoteResult.map((item, index) => (
            <VoteResultCard value={item.value} key={index}></VoteResultCard>
          ))
        }
      </ul>
    </section>
    <section>
      <h2 className="vote-block__section-title">Players:</h2>
      <ul>
        {
          membersVoteResult.map((item, index) => (
            <MemberCard key={index} kind={MemberCardKind.CHAT} user={item.user}></MemberCard>
          ))
        }
      </ul>

    </section>
  </div>
}