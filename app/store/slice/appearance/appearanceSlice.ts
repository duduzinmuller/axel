import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppearanceState {
  animations: boolean;
  avatar: boolean;
  reducedMotion: boolean;
}

const initialState: AppearanceState = {
  animations: true,
  avatar: true,
  reducedMotion: false,
};

const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    setAnimations(state, action: PayloadAction<boolean>) {
      state.animations = action.payload;
    },
    setAvatar(state, action: PayloadAction<boolean>) {
      state.avatar = action.payload;
    },
    setReducedMotion(state, action: PayloadAction<boolean>) {
      state.reducedMotion = action.payload;
    },
    resetAppearanceSettings() {
      return initialState;
    },
  },
});

export const {
  setAnimations,
  setAvatar,
  setReducedMotion,
  resetAppearanceSettings,
} = appearanceSlice.actions;

export default appearanceSlice.reducer;
