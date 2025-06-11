"use client";

import { useSearchParams } from "next/navigation";

export default function NotificationEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen items-center justify-center p-4 not-first:flex">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-semibold">Verifique seu Email</h1>
        <p className="text-lg">
          Enviamos um código para <span className="font-bold">{email}</span>.
        </p>
        <p className="mt-2 text-sm">
          Verifique sua caixa de entrada (e também o spam) para continuar.
        </p>
      </div>
    </div>
  );
}
