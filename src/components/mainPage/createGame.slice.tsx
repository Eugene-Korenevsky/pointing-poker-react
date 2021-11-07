import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createGameSlice = createSlice({
  name: 'createGame',
  initialState: { isCreateGame: false, id: '' },
  reducers: {
    createGameAction: (state, action: PayloadAction<boolean>) => {
      state.isCreateGame = action.payload;
    },
    IDGameAction: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});
export const { createGameAction, IDGameAction } = createGameSlice.actions;
export default createGameSlice.reducer;
