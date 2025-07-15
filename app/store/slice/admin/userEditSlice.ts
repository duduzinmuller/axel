import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "@/app/types/user";

interface UserEditState {
  isOpen: boolean;
  selectedUser: Users | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserEditState = {
  isOpen: false,
  selectedUser: null,
  isLoading: false,
  error: null,
  success: false,
};

const userEditSlice = createSlice({
  name: "adminUserEdit",
  initialState,
  reducers: {
    openEditDialog(state, action: PayloadAction<Users>) {
      state.isOpen = true;
      state.selectedUser = action.payload;
      state.error = null;
      state.success = false;
    },
    closeEditDialog(state) {
      state.isOpen = false;
      state.selectedUser = null;
      state.error = null;
      state.success = false;
    },
    setEditLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setEditError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setEditSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
    },
    updateSelectedUser(state, action: PayloadAction<Partial<Users>>) {
      if (state.selectedUser) {
        state.selectedUser = { ...state.selectedUser, ...action.payload };
      }
    },
  },
});

export const {
  openEditDialog,
  closeEditDialog,
  setEditLoading,
  setEditError,
  setEditSuccess,
  updateSelectedUser,
} = userEditSlice.actions;

export default userEditSlice.reducer;
