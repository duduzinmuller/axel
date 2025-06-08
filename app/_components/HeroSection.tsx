"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import TypeWriter from "./TypeWriter";

const HeroSection = () => {
  const [step, setStep] = useState(0);

  return (
    <section className="from-background via-background to-muted relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0">
        <div className="bg-primary/60 animate-pulse-glow absolute top-20 left-10 h-2 w-2 rounded-full"></div>
        <div className="bg-accent/60 animate-pulse-glow absolute top-40 right-20 h-1 w-1 rounded-full"></div>
        <div className="bg-primary/40 animate-pulse-glow absolute bottom-32 left-1/4 h-1.5 w-1.5 rounded-full"></div>
        <div className="bg-accent/40 animate-pulse-glow absolute right-1/3 bottom-20 h-1 w-1 rounded-full"></div>
      </div>

      <div className="z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="flex justify-center">
          <Image src="/axel.svg" width={150} height={150} alt="Axel" />
        </div>

        <h1 className="text-foreground relative mb-6 min-h-[140px] text-3xl leading-tight font-bold md:text-6xl lg:text-7xl">
          <span className="invisible block">
            Olá, sou o Axel AI, seu assistente virtual!
          </span>

          <span className="absolute inset-0">
            <span className="inline">
              <TypeWriter
                text="Olá, sou o"
                className="inline"
                speed={90}
                startTyping={step === 0}
                onComplete={() => setStep(1)}
              />
              <TypeWriter
                text=" Axel AI,"
                className="bg-gradient-axel inline bg-clip-text text-transparent"
                speed={90}
                startTyping={step === 1}
                onComplete={() => setStep(2)}
              />
            </span>
            <br />
            <TypeWriter
              text="seu assistente virtual!"
              className="block"
              speed={60}
              startTyping={step === 2}
              onComplete={() => setStep(3)}
            />
          </span>
        </h1>

        <div className="min-h-[130px]">
          {step >= 3 && (
            <TypeWriter
              text="Estou aqui para facilitar sua vida e te ajudar com o que for preciso. Quer saber mais sobre como posso te ajudar ou já quer começar a experimentar?"
              className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed md:text-xl"
              speed={60}
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-gradient-axel transform cursor-pointer rounded-lg border-0 px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
          >
            Sobre
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground transform cursor-pointer rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Experimentar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
