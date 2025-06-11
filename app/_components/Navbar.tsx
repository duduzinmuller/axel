"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Agora incluindo a nova seção:
const sections = ["inicio", "sobre", "planos", "capacidade", "experimentar"];

export default function Header() {
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      let current = "inicio";

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // ativa ao carregar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed z-10 z-50 w-full bg-[#111] px-4 py-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Image src="/axel.svg" width={35} height={35} alt="Axel" />
        </div>

        {/* Links de navegação */}
        <nav className="hidden gap-6 text-sm md:flex">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`transition-colors ${
                activeSection === id
                  ? "font-semibold text-purple-500"
                  : "text-white"
              }`}
            >
              {
                {
                  inicio: "Início",
                  sobre: "Sobre",
                  planos: "Planos",
                  capacidade: "Capacidades",
                  experimentar: "Experimentar",
                }[id]
              }
            </a>
          ))}
        </nav>

        {/* Entrar / Registrar */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm">
            Entrar
          </Link>
          <Link href="/register">
            <Button className="h-auto rounded-full bg-purple-500 px-4 py-1 text-sm text-white hover:bg-purple-700">
              registrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
