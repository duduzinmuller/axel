export interface UsageData {
  currentCount: number;
  planLimit: number;
  plan: string;
  remainingMessages: number;
}

export interface UsageState {
  usage: UsageData | null;
  isLoading: boolean;
}
