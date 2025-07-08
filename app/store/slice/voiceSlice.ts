import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VoiceState {
  voiceEnabled: boolean;
  selectedVoice: string | null;
  voiceRate: number;
}

const initialState: VoiceState = {
  voiceEnabled: true,
  selectedVoice: null,
  voiceRate: 1, // 1 = normal, pode ser de 0.5 a 2
};

const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoiceEnabled(state, action: PayloadAction<boolean>) {
      state.voiceEnabled = action.payload;
    },
    setSelectedVoice(state, action: PayloadAction<string | null>) {
      state.selectedVoice = action.payload;
    },
    setVoiceRate(state, action: PayloadAction<number>) {
      state.voiceRate = action.payload;
    },
  },
});

export const { setVoiceEnabled, setSelectedVoice, setVoiceRate } =
  voiceSlice.actions;
export default voiceSlice.reducer;
