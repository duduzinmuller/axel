import { useAppDispatch, useAppSelector } from "@/app/store";
import { setUsage, clearUsage, setIsLoading } from "@/app/store/slice/usage";
import { useCallback } from "react";

export const useUsage = () => {
  const dispatch = useAppDispatch();
  const { usage, isLoading } = useAppSelector((state) => state.usage);

  const updateUsage = useCallback(
    (newUsage: any) => {
      console.log("useUsage - Atualizando usage:", newUsage);
      dispatch(setUsage(newUsage));
      localStorage.setItem("ai_usage", JSON.stringify(newUsage));
    },
    [dispatch],
  );

  const clearUsageData = useCallback(() => {
    console.log("useUsage - Limpando usage");
    dispatch(clearUsage());
    localStorage.removeItem("ai_usage");
  }, [dispatch]);

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch(setIsLoading(loading));
    },
    [dispatch],
  );

  return {
    usage,
    isLoading,
    updateUsage,
    clearUsage: clearUsageData,
    setIsLoading: setLoading,
  };
};
