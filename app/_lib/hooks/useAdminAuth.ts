import { useAppSelector } from "@/app/store";
import { USER_ROLES } from "@/app/_constants/roles";

export const useAdminAuth = () => {
  const { user, isAuthenticated, isInitializing } = useAppSelector(
    (state) => state.auth,
  );

  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const isAuthenticatedAdmin = isAuthenticated && isAdmin;

  return {
    user,
    isAuthenticated,
    isInitializing,
    isAdmin,
    isAuthenticatedAdmin,
  };
};
