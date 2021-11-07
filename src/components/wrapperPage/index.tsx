import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import { IconButton } from '@material-ui/core';
import { Controller } from '../../api/Controller';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MemberVote } from '../../model/MemberVote';
import { GameState, Room } from '../../model/Room';
import { User } from '../../model/User';
import { UserRole } from '../../model/UserRole';
import { setFullData, setMembers, setMemberVote, setRoomState } from '../../slices/GameSlice';
import { setUser, ifKicked } from '../../slices/UserSlice';
import GamePage from './gamePage';
import AdmitRejectNewMember from './gamePage/admitRejectNewMember';
import LobbyPage from './lobby';
import ResultPage from './resultPage';
import Chat, { Message } from '../common/chat';
import './wrapperPage.css';


export default function WrapperPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const currentUser = useAppSelector((state) => state.user);
  const history = useHistory();
  const [waitingList, setWaitingList] = useState([] as User[]);
  const [isChatOpend, setIsChatOpend] = useState(false);
  const [messages, setMessages] = useState([] as Message[]);
  const socket = useAppSelector(state => state.socket.socket);

  const changeChatViewHandler = () => {
    setIsChatOpend(!isChatOpend);
  }

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    const roomID = localStorage.getItem('roomID');
    if (userID !== null && roomID !== null) {
      if (currentUser.user.id.length === 0) {
        Controller.getDataForReload(socket, roomID, userID).then(response => {
          if(response.status === 200) {
            dispatch(setUser(response.user!));
          } else
            history.push('/');
        })
      }
      if (game.room.roomID.length === 0) {
        Controller.getDataForReload(socket, roomID, userID).then(response => {
          const room: Room = { ...response.roomObj!, members: response.users! };
          const dealer: User = response.dealer!;
          const memberVote: MemberVote = response.memberVote!;
          if(response.status === 200){
            if(memberVote){
              dispatch(setFullData({room, dealer, memberVote}))
            } else {
              dispatch(setFullData({room, dealer}))
            }
          }else
            history.push('/');
        })
      }
    }
  });

  useEffect(() => {
    socket.on("users", (users): void => {
      const usersO: User[] = users;
      dispatch(setMembers(usersO));
      dispatch(ifKicked(usersO));
    });
    socket.on("getVoteResults", (roomObj): void => {
      const {roomID, state, name, issues, gameSettings, members, memberVote} = roomObj;
      dispatch(setRoomState({roomID, state, gameSettings, members, name, issues} as Room));
      dispatch(setMemberVote(memberVote));
    });
    socket.on('updatedRoom', (roomObj) => {
      const {gameSettings, issues, members, name, roomID, state, memberVote} = roomObj;
      const room:Room = {
        gameSettings,
        issues,
        members,
        name,
        roomID,
        state
      }
      dispatch(setMemberVote(memberVote));
      dispatch(setRoomState(room));
    });
    socket.on('message', ({ user, message }) => {
      const newMessage = { user, message, id: Date.now() } as Message;
      setMessages(state => [...state, newMessage]);
    });
    if(currentUser.user.role === UserRole.DEALER) {
      console.log('a');
      socket.on('confirmUser', (newUser) => {
        setWaitingList(state => [...state, newUser]);
      });
    }
  }, [socket]);

  if (currentUser.kicked) history.push(`/`);

  let page: JSX.Element = <></>;
  switch (game.room.state) {
    case GameState.WAITING:
      page = <LobbyPage></LobbyPage>
      break;
    case GameState.PLAYING:
      page = <GamePage></GamePage>
      break;
    case GameState.RESULT:
      page = <ResultPage></ResultPage>
      break;
    default:
      page = <></>;
      break;
  }

  return (
    <div className="page-wrapper">
      {page}
      <div className="chat-view-btn-container">
        {isChatOpend && <Chat messages={messages} />}
        <IconButton size="medium" className="chat-view-btn" onClick={changeChatViewHandler}>
          <ChatIcon color="primary" fontSize="large"/>
        </IconButton>
      </div>
      {currentUser.user.role === UserRole.DEALER &&
        waitingList.map(elem => <AdmitRejectNewMember key={elem.id} user={elem} setWaitingList={setWaitingList} />)}
    </div>
  );
}
