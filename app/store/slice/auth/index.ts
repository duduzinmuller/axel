import authReducer, {
  signOut,
  clearError,
  setHasRegistered,
  updateUserPlan,
} from "./auth-reducer";

export default authReducer;

export { signOut, clearError, setHasRegistered, updateUserPlan };

export {
  initAuth,
  login,
  signup,
  updateUserProfile,
  deleteUserProfile,
  signInFromCallback,
  verifyCode,
  resendVerificationCode,
  requestSendEmail,
  requestNewPassword,
} from "./auth-thunks";

export const selectUser = (state: { auth: { user: string } }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: {
  auth: { isAuthenticated: boolean };
}) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: { isLoading: boolean } }) =>
  state.auth.isLoading;
export const selectIsInitializing = (state: {
  auth: { isInitializing: boolean };
}) => state.auth.isInitializing;
export const selectError = (state: { auth: { error: string | null } }) =>
  state.auth.error;
export const selectHasRegistered = (state: {
  auth: { hasRegistered: boolean };
}) => state.auth.hasRegistered;
