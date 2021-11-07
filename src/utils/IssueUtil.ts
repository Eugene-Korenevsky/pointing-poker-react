import { Issue, IssueStatistic } from '../model/Issue';

export class IssueUtil {
  public static getCurrentIssueStatistics(issues: Issue[], currentIssue: number): IssueStatistic[] | undefined {
    return issues[currentIssue].statistic;
  }

  public static getRandomId(): number {
    return Math.floor(Math.random() * 10000000);
  }
}
