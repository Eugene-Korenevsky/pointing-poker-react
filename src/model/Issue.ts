export enum IssuePriority {
  LOW = 'Low priority',
  MIDDLE = 'Middle priority',
  HIGHT = 'Hight priority',
}

export interface Issue {
  id: string;
  priority: IssuePriority;
  name: string;
  link: string;
  score?: string;
  statistic?: IssueStatistic[];
}

export interface IssueStatistic {
  value: string,
  percentage: string
}
