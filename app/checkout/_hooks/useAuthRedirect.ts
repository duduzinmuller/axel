import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store";

export function useAuthRedirect() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isLoading && (!user || !isAuthenticated)) {
      router.push("/login");
    }
  }, [isAuthenticated, user, isLoading, router]);

  return { user, isLoading };
}
