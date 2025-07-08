import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalityState {
  proactive: boolean;
  formalidade: number;
  proatividade: number;
  instructions: string;
}

const initialState: PersonalityState = {
  proactive: true,
  formalidade: 40,
  proatividade: 60,
  instructions: "",
};

const personalitySlice = createSlice({
  name: "personality",
  initialState,
  reducers: {
    setProactive(state, action: PayloadAction<boolean>) {
      state.proactive = action.payload;
    },
    setFormalidade(state, action: PayloadAction<number>) {
      state.formalidade = action.payload;
    },
    setProatividade(state, action: PayloadAction<number>) {
      state.proatividade = action.payload;
    },
    setInstructions(state, action: PayloadAction<string>) {
      state.instructions = action.payload;
    },
    resetPersonality() {
      return initialState;
    },
  },
});

export const {
  setProactive,
  setFormalidade,
  setProatividade,
  setInstructions,
  resetPersonality,
} = personalitySlice.actions;
export default personalitySlice.reducer;
