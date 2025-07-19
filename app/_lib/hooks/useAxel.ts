import { useRef, useState } from "react";

import { useAppSelector } from "@/app/store";

declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}

type ResponseType = "text" | "code" | "list" | "email";

type CommandCallback = (response: { text: string; type: ResponseType }) => void;

type UseBrenderOptions = {
  onResponse: CommandCallback;
  onUserSpeech?: (text: string) => void;
  voiceEnabled?: boolean;
};

export function useBrender(
  onResponseOrOptions: CommandCallback | UseBrenderOptions,
) {
  const [isListening, setIsListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);

  const {
    selectedVoice,
    voiceEnabled: voiceEnabledFromStore,
    voiceRate,
  } = useAppSelector((state) => state.voice);

  const voiceEnabled = voiceEnabledFromStore;

  const onResponse =
    typeof onResponseOrOptions === "function"
      ? onResponseOrOptions
      : onResponseOrOptions.onResponse;

  const onUserSpeech =
    typeof onResponseOrOptions === "function"
      ? undefined
      : onResponseOrOptions.onUserSpeech;

  function speak(text: string) {
    if (!voiceEnabled) return;

    const utter = new window.SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (selectedVoice) {
      const voiceObj = voices.find((v) => v.voiceURI === selectedVoice);
      if (voiceObj) {
        utter.voice = voiceObj;
      }
    } else {
      const defaultVoice = voices.find(
        (v) => v.lang === "pt-BR" || v.name.includes("Portuguese"),
      );
      if (defaultVoice) utter.voice = defaultVoice;
    }

    utter.rate = voiceRate || 1;
    utter.volume = 1;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utter);
    onResponse({ text, type: "text" });
  }

  function setVoiceByName(voiceName: string) {
    if (typeof window === "undefined") return;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.name === voiceName);
    if (voice) {
      console.log(`Voz definida para: ${voice.name}`);
    } else {
      console.warn(`Voz com nome "${voiceName}" não encontrada.`);
    }
  }

  function listAvailableVoices() {
    if (typeof window === "undefined") return [];
    const voices = window.speechSynthesis.getVoices();
    voices.forEach((voice) => {
      console.log(`${voice.name} - ${voice.lang}`);
    });
    return voices;
  }

  function startListening() {
    if (isListening) {
      console.log("Já está ouvindo...");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition =
        typeof window !== "undefined"
          ? window.SpeechRecognition || window.webkitSpeechRecognition
          : undefined;

      if (!SpeechRecognition) {
        speak("Reconhecimento de voz não suportado neste navegador.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "pt-BR";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        console.log("Reconhecido:", transcript);
        if (onUserSpeech) onUserSpeech(transcript);
        onResponse({ text: transcript, type: "text" });
      };

      recognition.onend = () => {
        if (isListening) {
          console.log("Reconhecimento encerrado, reiniciando...");
          recognition.start();
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        if (isListening && event.error !== "audio-capture") {
          recognition.start();
        } else if (event.error === "audio-capture") {
          speak(
            "Não consegui acessar o microfone. Por favor, verifique as permissões e o dispositivo.",
          );
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }

    setIsListening(true);
    recognitionRef.current.start();
    speak("Microfone ativado.");
  }

  function stopListening() {
    if (!isListening) {
      console.log("Microfone já está desligado.");
      return;
    }

    setIsListening(false);
    recognitionRef.current?.stop();
    speak("Microfone desligado.");
  }

  function stopSpeaking() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      console.log("Fala interrompida.");
    }
  }

  return {
    isListening,
    speaking,
    voiceEnabled,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    setVoiceByName,
    listAvailableVoices,
  };
}
