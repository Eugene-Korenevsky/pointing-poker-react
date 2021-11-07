import {
  createSlice, PayloadAction, Reducer,
} from '@reduxjs/toolkit';
import { User } from "../model/User";

interface UserState {
  user: User,
  kicked: boolean,
  kickedRoom: string,
}

const initialState = {
  user: {
    id: '',
    image: '',
    name: '',
    surname: '',
    role: '',
    jobPosition: '',
    room: ''
  },
  kicked: false,
  kickedRoom: '',

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>): void => {
      if(action.payload !== undefined) {
        state.user.id = action.payload.id;
        if (action.payload.image) {
          state.user.image = action.payload.image;
        }
        state.user.name = action.payload.name;
        state.user.surname = action.payload.surname;
        state.user.role = action.payload.role;
        state.user.jobPosition = action.payload.jobPosition;
        state.user.room = action.payload.room;
        if(action.payload.room !== state.kickedRoom) {
          state.kicked = false
        }
      }
    },
    ifKicked: (state, action: PayloadAction<User[]>): void => {
      if (state.user.id.length > 1) {
        let kickedLet = true
        action.payload.forEach((user) => {
          if (user.id === state.user.id) {
            kickedLet = false
          }
        });
        if (kickedLet) {
          state.kicked = kickedLet;
          state.kickedRoom = state.user.room;
          state.user = initialState.user;
        }
      }
    },
    exitUser: (state): void => {
      state.user = initialState.user;
    }
  }
});

const { actions, reducer } = userSlice;

export const { setUser, ifKicked, exitUser } = actions;

export default reducer as Reducer<UserState>;
