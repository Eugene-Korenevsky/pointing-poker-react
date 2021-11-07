import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { Issue, IssuePriority } from '../../../../../model/Issue';
import { addIssue } from '../../../../../slices/GameSlice';
import './issueFromFile.css';
import sampleExcel from '../../../../../assets/issue-from-file.xlsx';
import { IssueUtil } from '../../../../../utils/IssueUtil';
import { Controller } from '../../../../../api/Controller';

export default function IssueFromFile(): JSX.Element {
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.game.room);
  const socket = useAppSelector((state) => state.socket.socket);
  const [open, setOpen] = useState(false);
  const issueItems: Issue[] = [];
  

  function createIssue(obj: string[]) {
    const issue: Issue = {
      id: '',
      priority: IssuePriority.LOW,
      name: '',
      link: '',
    };
    if (obj.length > 0) {
      [issue.name] = obj;
      issue.link = obj[2] || '';
      issue.id = `${IssueUtil.getRandomId()}`;
      if (obj[1]) {
        switch (obj[1].toLocaleLowerCase()) {
          case 'low':
            issue.priority = IssuePriority.LOW;
            break;
          case 'middle':
            issue.priority = IssuePriority.MIDDLE;
            break;
          case 'hight':
            issue.priority = IssuePriority.HIGHT;
            break;
          default:
            issue.priority = IssuePriority.LOW;
        }
      } else {
        issue.priority = IssuePriority.LOW;
      }
      issueItems.push(issue);
    }
  }

  const sendIssues = () => {
    const issuesRes = [...room.issues, ...issueItems];
    Controller.updateIssues(socket, room.roomID, issuesRes);
  }

  function handleDownloadIssues(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.currentTarget?.files![0] as File;
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const dataParse: [string, string, string][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      dataParse.map((obj) => createIssue(obj.filter((el) => el)));
      sendIssues();
      setOpen(false);
    };
    reader.readAsBinaryString(file);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="issue-from-file__button" onClick={handleClickOpen}>
        Add issue from file
      </div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogContent className="issue-from-file__content">
          <DialogContentText>
            To ensure your .xlsx is in the correct format,{' '}
            <a href={sampleExcel} download>
              download a sample .xlsx
            </a>
          </DialogContentText>
          <label className="issue-from-file__label" htmlFor="issue-from-file">
            Choose file
            <input
              className="issue-from-file__input"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              id="issue-from-file"
              onChange={(event) => handleDownloadIssues(event)}
            />
          </label>
        </DialogContent>
      </Dialog>
    </>
  );
}
