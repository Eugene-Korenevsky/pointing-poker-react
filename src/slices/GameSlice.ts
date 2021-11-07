import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSettings } from '../components/wrapperPage/lobby/settingsBlock/settingBlog.slice';
import { Issue } from '../model/Issue';
import { MemberVote, MemberVoteStatus } from '../model/MemberVote';
import { GameState, Room } from '../model/Room';
import { User } from '../model/User';
import { UserRole } from '../model/UserRole';

interface RoomState {
  room: Room;
  dealer: User;
  memberVote: MemberVote;
}
const initialState: RoomState = {
  room: {
    roomID: '',
    name: 'Lobby Name',
    members: [],
    state: GameState.NONE,
    gameSettings: {
      isMasterAsPlayer: true,
      cardValues: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'],
      scopeTipeShort: '',
      isAutoNewPlayer: true,
      isAutoCardFlipping: true,
      isChangingCard: false,
      isTimer: false,
      timeMin: '2',
      timeSec: '00',
    },
    issues: [],
  },
  dealer: {
    id: '',
    image: '',
    name: '',
    surname: '',
    role: '',
    jobPosition: '',
    room: '',
  },
  memberVote: {
    status: MemberVoteStatus.BEFORE_START,
    memberVoteResult: [],
    currentIssue: -1,
    chosenValue: '',
    timer: {
      min: 0,
      sec: 0,
      start: false,
    },
  },
};

export const gameSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setRoomState: (state, action: PayloadAction<Room>): void => {
      state.room = action.payload;
    },
    setSettings: (state, action: PayloadAction<GameSettings>): void => {
      state.room.gameSettings = action.payload;
    },
    setName: (state, action: PayloadAction<string>): void => {
      state.room.name = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>): void => {
      state.room.roomID = action.payload;
    },
    setMembers: (state, action: PayloadAction<User[]>): void => {
      state.room.members = action.payload;
      action.payload.forEach((user) => {
        if (user.role === UserRole.DEALER) state.dealer = user;
      });
    },
    setFullData: (state, action: PayloadAction<{ room: Room; dealer?: User; memberVote?: MemberVote }>): void => {
      state.room = action.payload.room;
      if (action.payload.dealer) {
        state.dealer = action.payload.dealer;
      }
      if (action.payload.memberVote) {
        state.memberVote = action.payload.memberVote;
      }
    },
    addIssue: (state, action: PayloadAction<Issue>): void => {
      state.room.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<Issue>): void => {
      state.room.issues.forEach((issue, index) => {
        if (action.payload.id === issue.id) {
          state.room.issues.splice(index, 1);
        }
      });
    },
    upDateIssue: (state, action: PayloadAction<Issue>): void => {
      state.room.issues.forEach((issue, index) => {
        if (action.payload.id === issue.id) {
          state.room.issues[index].link = action.payload.link;
          state.room.issues[index].name = action.payload.name;
          state.room.issues[index].priority = action.payload.priority;
        }
      });
    },
    changeGameState: (state, action: PayloadAction<GameState>): void => {
      state.room.state = action.payload;
    },
    setChosenValue: (state, action: PayloadAction<string>): void => {
      state.memberVote.chosenValue = action.payload;
    },
    setMemberVote: (state, action: PayloadAction<MemberVote>): void => {
      state.memberVote = action.payload;
    },
  },
});

const { actions } = gameSlice;

export const {
  setMembers,
  addIssue,
  removeIssue,
  upDateIssue,
  changeGameState,
  setRoomId,
  setName,
  setSettings,
  setRoomState,
  setFullData,
  setChosenValue,
  setMemberVote,
} = actions;

export { initialState };
