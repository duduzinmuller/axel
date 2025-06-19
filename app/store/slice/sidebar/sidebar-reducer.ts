import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isSidebarOpen: boolean;
  selectedExample: string | null;
}

const initialState: SidebarState = {
  isSidebarOpen: true,
  selectedExample: null,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setSelectedExample(state, action: PayloadAction<string>) {
      state.selectedExample = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setSelectedExample } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
