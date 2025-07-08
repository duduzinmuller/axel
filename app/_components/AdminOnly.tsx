"use client";

import { useAdminAuth } from "@/app/_lib/hooks/useAdminAuth";

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminOnly({
  children,
  fallback = null,
}: AdminOnlyProps) {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
