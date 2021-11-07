import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cancelGamePopupAction } from './cancelGamePopup.slice';
import './cancelGamePopup.css';
import { UserRole } from '../../../model/UserRole';

export default function CancelGamePopup(): JSX.Element {
  const [isOpenPopup, setIsOpenPopup] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isDealer = user.role === UserRole.DEALER;

  function handleOK() {
    setIsOpenPopup(false);
    dispatch(cancelGamePopupAction(false));
  }

  return (
    <Dialog open={isOpenPopup} aria-labelledby="form-dialog-title">
      <DialogTitle className="dialog-title" id="form-dialog-title">
        Notification!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{`The game was canceled ${isDealer ? 'successfully' : 'by the dealer'} `}</DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <div className="dialog-actions__btn-wrap_one">
          <Button onClick={handleOK} color="primary" variant="contained">
            OK
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
