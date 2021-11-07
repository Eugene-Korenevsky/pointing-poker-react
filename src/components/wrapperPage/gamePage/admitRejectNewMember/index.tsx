import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import './admitRejectNewMember.css';
import { User } from '../../../../model/User';
import { Controller } from '../../../../api/Controller';
import { useAppSelector } from '../../../../app/hooks';

interface AdmitRejectNewMemberProps {
  user: User;
  setWaitingList: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function AdmitRejectNewMember(props: AdmitRejectNewMemberProps): JSX.Element {
  const socket = useAppSelector(state => state.socket.socket);
  const [isOpenPopup, setIsOpenPopup] = useState(true);

  function deleteUserFromWaiting() {
    props.setWaitingList(state => {
      const index =  state.findIndex(currentUser => currentUser.id === props.user.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return state;
    });
  };

  function handleAdmit() {
    setIsOpenPopup(false);
    Controller.completeUser(socket, props.user.id, true);
    deleteUserFromWaiting();
  }

  function handleReject() {
    setIsOpenPopup(false);
    Controller.completeUser(socket, props.user.id, false);
    deleteUserFromWaiting();
  }

  return (
    <Dialog open={isOpenPopup} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New member</DialogTitle>
      <DialogContent>
        <DialogContentText>{`A ${props.user.name} wants to join this game`}</DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <div className="dialog-actions__btn-wrap">
          <Button onClick={handleAdmit} color="primary" variant="contained">
            Admit
          </Button>
          <Button onClick={handleReject} color="secondary" variant="contained">
            Reject
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
