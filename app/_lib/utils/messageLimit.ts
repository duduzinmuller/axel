const FREE_PLAN_LIMIT = 10;

export const MessageLimitUtils = {
  getTodayKey(): string {
    return new Date().toDateString();
  },

  getMessageCount(): number {
    if (typeof window === "undefined") return 0;

    const today = this.getTodayKey();
    const storedData = localStorage.getItem(`messageCount_${today}`);

    if (storedData) {
      try {
        const { count } = JSON.parse(storedData);
        return count || 0;
      } catch {
        return 0;
      }
    }

    return 0;
  },

  incrementMessageCount(): number {
    if (typeof window === "undefined") return 0;

    const today = this.getTodayKey();
    const currentCount = this.getMessageCount();
    const newCount = currentCount + 1;

    localStorage.setItem(
      `messageCount_${today}`,
      JSON.stringify({
        count: newCount,
        date: today,
      }),
    );

    return newCount;
  },

  resetMessageCount(): void {
    if (typeof window === "undefined") return;

    const today = this.getTodayKey();
    localStorage.removeItem(`messageCount_${today}`);
  },

  isLimitReached(): boolean {
    return this.getMessageCount() >= FREE_PLAN_LIMIT;
  },

  getRemainingMessages(): number {
    const currentCount = this.getMessageCount();
    return Math.max(0, FREE_PLAN_LIMIT - currentCount);
  },

  getResetTime(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilReset = tomorrow.getTime() - Date.now();
    const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeUntilReset % (1000 * 60 * 60)) / (1000 * 60),
    );

    return `${hours}h ${minutes}m`;
  },

  getLimit(): number {
    return FREE_PLAN_LIMIT;
  },

  syncWithBackend(backendCount: number): void {
    if (typeof window === "undefined") return;

    const today = this.getTodayKey();
    localStorage.setItem(
      `messageCount_${today}`,
      JSON.stringify({
        count: backendCount,
        date: today,
      }),
    );
  },

  // Verificar se o limite foi atingido baseado nas informações do AI
  isAILimitReached(): boolean {
    if (typeof window === "undefined") return false;

    try {
      const aiUsage = localStorage.getItem("ai_usage");
      if (aiUsage) {
        const usage = JSON.parse(aiUsage);
        return usage.currentCount >= usage.planLimit;
      }
    } catch (error) {
      console.error("Erro ao verificar limite do AI:", error);
    }

    return false;
  },

  // Obter informações de uso do AI
  getAIUsage(): any {
    if (typeof window === "undefined") return null;

    try {
      const aiUsage = localStorage.getItem("ai_usage");
      return aiUsage ? JSON.parse(aiUsage) : null;
    } catch (error) {
      console.error("Erro ao obter uso do AI:", error);
      return null;
    }
  },
};
