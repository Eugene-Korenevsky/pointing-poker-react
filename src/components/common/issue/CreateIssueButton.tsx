import { Button, SvgIcon } from '@material-ui/core';
import React from 'react';
import { useCardsStyles } from '../../../styles/CardStyles';
import { ReactComponent as StarIcon } from '../../../assets/create.svg';
import './issue-common.css';
import IssueDialog from '../issueDialog/IssueDialog';
import { Issue, IssuePriority } from '../../../model/Issue';
import { GameState } from '../../../model/Room';
import { useAppSelector } from '../../../app/hooks';
import { IssueUtil } from '../../../utils/IssueUtil';

export interface CreateIssueButtonProps {
  onClickHandler: (issue: Issue) => void;
}

export default function CreateIssueButton(props: CreateIssueButtonProps): JSX.Element {
  const classes = useCardsStyles();
  const [open, setOpen] = React.useState(false);
  const room = useAppSelector((state) => state.game.room);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const yesHandler = ($name: string, $link: string, $priority: IssuePriority) => {
    setOpen(false);
    const issue = {
      id: `${IssueUtil.getRandomId()}`,
      priority: $priority,
      name: $name,
      link: $link,
    };
    props.onClickHandler(issue);
  };

  const noHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        className={room.state === GameState.PLAYING ? classes.createIssueButtonGame : classes.createIssueButton}
        endIcon={
          <SvgIcon
            className={room.state === GameState.PLAYING ? 'icon_game' : 'icon'}
            component={StarIcon}
            viewBox="0 0 56 56"
          ></SvgIcon>
        }
      >
        {' '}
        Create New Issue
      </Button>
      <IssueDialog create={true} noHandler={noHandler} open={open} onClose={yesHandler}></IssueDialog>
    </div>
  );
}
