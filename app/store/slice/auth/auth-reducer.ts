import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { StorageUtils } from "../../utils/storage-utils";
import type { AuthState } from "../../types/auth-types";
import * as authThunks from "./auth-thunks";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitializing: true,
  isLoading: false,
  error: null,
  hasRegistered: false,
  ...StorageUtils.loadState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.hasRegistered = false;
      StorageUtils.removeTokens();
    },
    clearError: (state) => {
      state.error = null;
    },
    setHasRegistered: (state, action: PayloadAction<boolean>) => {
      state.hasRegistered = action.payload;
    },
    updateUserPlan: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.plan = action.payload;
        StorageUtils.setUser({ ...state.user });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.initAuth.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(authThunks.initAuth.fulfilled, (state, action) => {
        state.isInitializing = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(authThunks.initAuth.rejected, (state) => {
        state.isInitializing = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(authThunks.login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authThunks.login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (action.payload.tokens) {
          state.accessToken = action.payload.tokens.accessToken;
          state.refreshToken = action.payload.tokens.refreshToken;
        }
        state.isAuthenticated = true;
      })
      .addCase(authThunks.login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(authThunks.signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authThunks.signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (action.payload.tokens) {
          state.accessToken = action.payload.tokens.accessToken;
          state.refreshToken = action.payload.tokens.refreshToken;
        }
        state.isAuthenticated = true;
      })
      .addCase(authThunks.signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(authThunks.signInFromCallback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authThunks.signInFromCallback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (action.payload.tokens) {
          state.accessToken = action.payload.tokens.accessToken;
          state.refreshToken = action.payload.tokens.refreshToken;
        }
        state.isAuthenticated = true;
      })
      .addCase(authThunks.signInFromCallback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(authThunks.verifyCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authThunks.verifyCode.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authThunks.verifyCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(authThunks.resendVerificationCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authThunks.resendVerificationCode.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authThunks.resendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(authThunks.updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authThunks.updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(authThunks.updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut, clearError, setHasRegistered, updateUserPlan } =
  authSlice.actions;
export default authSlice.reducer;
