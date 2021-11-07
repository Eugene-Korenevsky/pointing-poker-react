import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameSettings = {
  isMasterAsPlayer: boolean;
  cardValues: string[];
  scopeTipeShort: string;
  isAutoNewPlayer: boolean;
  isAutoCardFlipping: boolean;
  isChangingCard: boolean;
  isTimer: boolean;
  timeMin: string;
  timeSec: string;
};

const fibonacci = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];

const initialState: GameSettings = {
  isMasterAsPlayer: true,
  cardValues: fibonacci,
  scopeTipeShort: '',
  isAutoNewPlayer: true,
  isAutoCardFlipping: true,
  isChangingCard: false,
  isTimer: false,
  timeMin: '2',
  timeSec: '00',
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    isMasterAsPlayerAction: (state, action: PayloadAction<boolean>) => {
      state.isMasterAsPlayer = action.payload;
    },
    cardValuesAction: (state, action: PayloadAction<string[]>) => {
      state.cardValues = action.payload;
    },
    scopeTipeShortAction: (state, action: PayloadAction<string>) => {
      state.scopeTipeShort = action.payload;
    },
    isAutoNewPlayerAction: (state, action: PayloadAction<boolean>) => {
      state.isAutoNewPlayer = action.payload;
    },
    isAutoCardFlippingAction: (state, action: PayloadAction<boolean>) => {
      state.isAutoCardFlipping = action.payload;
    },
    isChangingCardAction: (state, action: PayloadAction<boolean>) => {
      state.isChangingCard = action.payload;
    },
    isTimerAction: (state, action: PayloadAction<boolean>) => {
      state.isTimer = action.payload;
    },
    timeMinAction: (state, action: PayloadAction<string>) => {
      state.timeMin = action.payload;
    },
    timeSecAction: (state, action: PayloadAction<string>) => {
      state.timeSec = action.payload;
    },
    resetSettingsAction: () => initialState,
  },
});

export const {
  isMasterAsPlayerAction,
  cardValuesAction,
  scopeTipeShortAction,
  isAutoNewPlayerAction,
  isAutoCardFlippingAction,
  isChangingCardAction,
  isTimerAction,
  timeMinAction,
  timeSecAction,
  resetSettingsAction,
} = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
