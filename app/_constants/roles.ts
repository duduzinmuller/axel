export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ROLE_LABELS = {
  [USER_ROLES.USER]: "Usuário",
  [USER_ROLES.ADMIN]: "Administrador",
} as const;
