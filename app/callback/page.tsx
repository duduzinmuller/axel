"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../store";
import { signInFromCallback } from "../store/slice/auth";
import LoadingScreen from "../_components/LoadingScreen";

export default function Callback() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      window.location.hash = "";
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/callback?access_token=${accessToken}`,
      )
        .then((res) => res.json())
        .then(async (data) => {
          if (!data.tokens) {
            throw new Error(data.message || "Falha ao autenticar via callback");
          }
          await dispatch(
            signInFromCallback({
              accessToken: data.tokens.accessToken,
              refreshToken: data.tokens.refreshToken,
            }),
          );
          router.push("/chat-axel");
        })
        .catch((err) => {
          console.error("Erro ao autenticar com backend:", err);
          router.push("/login");
        });
    }
  }, [router, dispatch]);

  return <LoadingScreen />;
}
