"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/app/_lib/hooks/useAdminAuth";
import LoadingScreen from "./LoadingScreen";
import UnauthorizedPage from "./UnauthorizedPage";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isInitializing, isAdmin } = useAdminAuth();

  console.log({ isAuthenticated, isInitializing, isAdmin });

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!isAdmin) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
}
