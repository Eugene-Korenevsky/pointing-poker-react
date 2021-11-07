import { GameSettings } from "../components/wrapperPage/lobby/settingsBlock/settingBlog.slice";
import { MemberVoteStatus, MemberVoteTicket } from "../model/MemberVote";
import { User } from "../model/User";
import { UserRole } from "../model/UserRole";

export interface MemberVoteResult {
  user: User;
  value: string;
}

export class VoteUtil {
  public static getVoteResult(members: User[], scopeTipeShort: string,
    status: MemberVoteStatus, settings: GameSettings,
    voteTickets?: MemberVoteTicket[]): MemberVoteResult[] {
    const result: MemberVoteResult[] = [];  
    if (status === MemberVoteStatus.FINISHED && voteTickets) {
      members.forEach((userItem) => {
        const res = voteTickets.filter((item) => userItem.id === item.userId);
        if(res.length > 0) {
          result.push({user: userItem, value: `${res[0].value} ${scopeTipeShort}`});
        } else {
          result.push({user: userItem, value: 'unknown'});
        }
      });
    } else {
      members.forEach((userItem) => {
        if(userItem.role === UserRole.PLAYER) result.push({user: userItem, value: 'In progress'}); 
        if(userItem.role === UserRole.DEALER && settings.isMasterAsPlayer) result.push({user: userItem, value: 'In progress'});
      });
    }
    return result
  }
}