"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed z-1 w-full px-4 py-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Image src="/axel.svg" width={35} height={35} alt="Axel" />
        </div>

        <nav className="hidden gap-10 text-sm md:flex">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`cursor-pointer transition-colors ${
                activeSection === id
                  ? "font-semibold text-purple-500"
                  : "hover:text-purple-500"
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

        <div className="flex items-center gap-4">
          <Link href="/login" className="cursor-pointer text-sm">
            Entrar
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-axel h-auto cursor-pointer rounded-full px-4 py-1 text-sm text-white hover:scale-90">
              Criar conta
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
