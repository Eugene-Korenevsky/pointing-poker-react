import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const cancelGamePopupSlice = createSlice({
  name: 'cancelGamePopup',
  initialState: { isCancelGamePopup: false },
  reducers: {
    cancelGamePopupAction: (state, action: PayloadAction<boolean>) => {
      state.isCancelGamePopup = action.payload;
    },
  },
});
export const { cancelGamePopupAction } = cancelGamePopupSlice.actions;
export default cancelGamePopupSlice.reducer;
