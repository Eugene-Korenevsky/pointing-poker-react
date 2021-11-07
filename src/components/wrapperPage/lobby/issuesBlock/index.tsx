import React, { useEffect, useState } from 'react';
import './issues.css';
import IssueeCard from '../../../common/issue/IssueCard';
import { Issue } from '../../../../model/Issue';
import { UserRole } from '../../../../model/UserRole';
import CreateIssueButton from '../../../common/issue/CreateIssueButton';
import { useAppSelector } from '../../../../app/hooks';
import IssueFromFile from './issueFromFile';
import { Controller } from '../../../../api/Controller';

export interface IssuesBlockProps {
  issues: Issue[];
}

export default function IssuesBlock(): JSX.Element {
  const room = useAppSelector((state) => state.game.room);
  const socket = useAppSelector((state) => state.socket.socket);
  const issues1 = useAppSelector((state) => state.game.room.issues);
  const [issues, setIssues] = useState(room.issues);
  const issueItems: JSX.Element[] = [];

  const deleteDialogYesHandler = (issuesProps: Issue[]) => {
    Controller.updateIssues(socket, room.roomID, issuesProps);
  };

  for (let i = 0; i < issues1.length; i++) {
    issueItems.push(
      <IssueeCard
        deleteIssueHandler={deleteDialogYesHandler}
        key={i}
        issue={issues1[i]}
        userRole={UserRole.DEALER}
      ></IssueeCard>,
    );
  }

  const createIssueHandler = (issue: Issue) => {
    const issuesRes = [...issues1];
    issuesRes.push(issue)
    Controller.updateIssues(socket, room.roomID, issuesRes);
  };

  useEffect(() => {
    if (JSON.stringify(issues) !== JSON.stringify(room.issues)) {
      Controller.updateIssues(socket, room.roomID, issues).then((response) => {
        if (response.status !== 200) {
          console.log(response.message);
        }
      });
    }
  }, [issues]);

  return (
    <div className="issues-block">
      <h5 className="common-title">Issues:</h5>
      <div className="common-card-block">
        {issueItems}
        <CreateIssueButton onClickHandler={createIssueHandler}></CreateIssueButton>
        <IssueFromFile />
      </div>
    </div>
  );
}
