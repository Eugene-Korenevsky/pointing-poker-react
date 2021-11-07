import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useButtonStyles } from '../../../styles/ButtonStyles';
import './common-dialogs.css';

export interface YesNoDialogProps {
  open: boolean;
  title: string;
  content: string;
  yesClickHandle: () => void;
  noClickHandle: () => void;
}
export default function YesNoDialog(props: YesNoDialogProps): JSX.Element {
  const { open, title, yesClickHandle, noClickHandle, content } = props;

  const classes = useButtonStyles();


  return <Dialog aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle className="issue-dialig-tittle" id="simple-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button className={classes.blueButton} onClick={yesClickHandle}>YES</Button>
      <Button className={classes.whiteButton} onClick={noClickHandle}>NO</Button>
    </DialogActions>
  </Dialog>
}