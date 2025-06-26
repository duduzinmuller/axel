import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UsageState, UsageData } from "../../types/usage-types";

const initialState: UsageState = {
  usage: null,
  isLoading: false,
};

const usageSlice = createSlice({
  name: "usage",
  initialState,
  reducers: {
    setUsage: (state, action: PayloadAction<UsageData>) => {
      state.usage = action.payload;
    },
    clearUsage: (state) => {
      state.usage = null;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUsage, clearUsage, setIsLoading } = usageSlice.actions;
export default usageSlice.reducer;
