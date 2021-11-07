import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const {REACT_APP_SERVER_DEPLOY} = process.env;
const defaultSocket = io(REACT_APP_SERVER_DEPLOY!, { transports: ['websocket', 'polling'] });

export const socketSlice = createSlice({
  name: 'socket',
  initialState: { socket: defaultSocket},
  reducers: {},
});
export default socketSlice.reducer;