import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "@/app/types/user";

interface UserDeleteState {
  isOpen: boolean;
  selectedUser: Users | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserDeleteState = {
  isOpen: false,
  selectedUser: null,
  isLoading: false,
  error: null,
  success: false,
};

const userDeleteSlice = createSlice({
  name: "adminUserDelete",
  initialState,
  reducers: {
    openDeleteDialog(state, action: PayloadAction<Users>) {
      state.isOpen = true;
      state.selectedUser = action.payload;
      state.error = null;
      state.success = false;
    },
    closeDeleteDialog(state) {
      state.isOpen = false;
      state.selectedUser = null;
      state.error = null;
      state.success = false;
    },
    setDeleteLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setDeleteError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setDeleteSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
    },
  },
});

export const {
  openDeleteDialog,
  closeDeleteDialog,
  setDeleteLoading,
  setDeleteError,
  setDeleteSuccess,
} = userDeleteSlice.actions;

export default userDeleteSlice.reducer;
