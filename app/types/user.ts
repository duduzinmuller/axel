export interface Users {
  id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: string;
  providerId?: string;
  plan: string;
  planExpiresAt?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  resetPasswordToken?: string | null;
  resetPasswordTokenExpires?: string | null;
  status: string;
  messages?: number;
}

export interface UsersStats {
  verified: number;
  pending: number;
  freePlan: number;
  monthlyPlan: number;
  annualPlan: number;
  totalMessages: number;
  avgMessages: number;
}
