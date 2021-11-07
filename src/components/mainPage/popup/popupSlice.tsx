import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialStates = {
  isPopup: false,
  isObsorverShow: true,
  popupData: {
    name: '',
    lastName: '',
    jobPosition: '',
    avatar: '',
    observer: false,
  },
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState: initialStates,
  reducers: {
    isPopupAction: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    isObsorverShow: (state, action: PayloadAction<boolean>) => {
      state.isObsorverShow = action.payload;
    },
    nameAction: (state, action: PayloadAction<string>) => {
      state.popupData.name = action.payload;
    },
    lastNameAction: (state, action: PayloadAction<string>) => {
      state.popupData.lastName = action.payload;
    },
    jobPositionAction: (state, action: PayloadAction<string>) => {
      state.popupData.jobPosition = action.payload;
    },
    avatarAction: (state, action: PayloadAction<string>) => {
      state.popupData.avatar = action.payload;
    },
    observerAction: (state, action: PayloadAction<boolean>) => {
      state.popupData.observer = action.payload;
    },
    clearPopupAction: () => initialStates,
  },
});

export const {
  isPopupAction,
  isObsorverShow,
  nameAction,
  lastNameAction,
  jobPositionAction,
  avatarAction,
  observerAction,
  clearPopupAction,
} = popupSlice.actions;
export default popupSlice.reducer;
