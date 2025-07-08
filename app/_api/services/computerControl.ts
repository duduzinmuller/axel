import axios from "axios";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/app/_constants/local-storage";

export async function shutdownComputer(speak: (msg: string) => void) {
  speak("Certo, mestre! Desligando o computador em 5 segundos...");
  setTimeout(async () => {
    try {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(
        LOCAL_STORAGE_REFRESH_TOKEN_KEY,
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/scripts/shutdown`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh-token": refreshToken || "",
          },
        },
      );
      speak(response.data?.message || "Computador desligado.");
    } catch (error) {
      console.error("Erro ao enviar o comando:", error);
      speak("Não foi possível desligar o computador.");
    }
  }, 5000);
}

export async function blockComputer(speak: (msg: string) => void) {
  speak("Certo, mestre! Bloqueando o computador...");
  setTimeout(async () => {
    try {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(
        LOCAL_STORAGE_REFRESH_TOKEN_KEY,
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/scripts/lock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh-token": refreshToken || "",
          },
        },
      );
      speak(response.data?.message || "Computador bloqueado.");
    } catch (error) {
      console.error("Erro ao bloquear o computador:", error);
      speak("Não foi possível bloquear o computador.");
    }
  }, 5000);
}

export async function restartComputer(speak: (msg: string) => void) {
  speak("Certo, mestre! Reiniciando o computador...");
  setTimeout(async () => {
    try {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(
        LOCAL_STORAGE_REFRESH_TOKEN_KEY,
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/scripts/restart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh-token": refreshToken || "",
          },
        },
      );
      speak(response.data?.message || "Computador reiniciado.");
    } catch (error) {
      console.error("Erro ao reiniciar o computador:", error);
      speak("Não foi possível reiniciar o computador.");
    }
  }, 5000);
}
