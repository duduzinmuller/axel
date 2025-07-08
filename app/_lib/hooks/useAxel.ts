import { useRef, useState } from "react";

import { useAppSelector } from "@/app/store";
import {
  blockComputer,
  restartComputer,
  shutdownComputer,
} from "@/app/_api/services/computerControl";
import { AIService } from "@/app/_api/services/ai";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
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

  const { user } = useAppSelector((state) => state.auth);
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
        takeCommand(transcript.toLowerCase());
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

  function detectType(text: string): ResponseType {
    if (text.match(/```/)) return "code";
    if (text.includes("@") && text.toLowerCase().includes("assunto"))
      return "email";
    if (text.split("\n").length > 1 && text.match(/^- |^\d+\. /m))
      return "list";
    return "text";
  }

  async function takeCommand(message: string) {
    console.log("Comando reconhecido:", message);

    if (
      message.includes("para de falar") ||
      message.includes("silêncio") ||
      message.includes("cala a boca")
    ) {
      stopSpeaking();
      speak("Ok, parei de falar.");
      return;
    }

    if (
      message.includes("desligar microfone") ||
      message.includes("parar de ouvir") ||
      message.includes("parar")
    ) {
      stopListening();
      return;
    }

    if (
      message.includes("olá") ||
      message.includes("oi") ||
      message.includes("eai")
    ) {
      speak(`Olá, ${user?.name || "mestre"}! Como posso te ajudar?`);
    } else if (message.includes("abrir google")) {
      window.open("https://google.com", "_blank");
      speak("Abrindo Google...");
    } else if (message.includes("me conta uma piada")) {
      const piadas = [
        "Por que o livro de matemática se suicidou? Porque estava cheio de problemas.",
        "O que é um vegetariano que come carne? Um ex-vegetariano.",
        "Por que o jacaré tirou o filho da escola? Porque ele réptil de ano.",
      ];
      const piada = piadas[Math.floor(Math.random() * piadas.length)];
      onResponse({ text: piada, type: "text" });
      speak(piada);
    } else if (
      message.includes("desligar computador") ||
      message.includes("desligar pc")
    ) {
      await shutdownComputer((text) => onResponse({ text, type: "text" }));
    } else if (
      message.includes("bloquear computador") ||
      message.includes("bloquear pc")
    ) {
      await blockComputer((text) => onResponse({ text, type: "text" }));
    } else if (
      message.includes("reiniciar computador") ||
      message.includes("reiniciar pc")
    ) {
      await restartComputer((text) => onResponse({ text, type: "text" }));
    } else if (message.includes("gerar resposta")) {
      onResponse({
        text: "Deixe-me pensar um pouco sobre isso...",
        type: "text",
      });
      const aiResult = await AIService.generationQuestionWithAI(message);
      const response = aiResult?.response;
      if (response) {
        const type = detectType(response);
        onResponse({ text: response, type });
        speak(response);
      } else {
        onResponse({
          text: "Não consegui encontrar uma resposta para isso.",
          type: "text",
        });
        speak("Não consegui encontrar uma resposta para isso.");
      }
    } else {
      const aiResult = await AIService.generationQuestionWithAI(message);
      const response = aiResult?.response;
      if (response) {
        const type = detectType(response);
        onResponse({ text: response, type });
        speak(response);
      } else {
        onResponse({ text: "Desculpe, não entendi o comando.", type: "text" });
        speak("Desculpe, não entendi o comando.");
      }
    }
  }

  return {
    isListening,
    speaking,
    voiceEnabled,
    startListening,
    stopListening,
    speak,
    takeCommand,
    stopSpeaking,
    setVoiceByName,
    listAvailableVoices,
  };
}
