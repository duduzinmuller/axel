"use client";

import { Calendar, Clock, ArrowLeft, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";

import VisaoGeral from "./components/VisaoGeral";
import Usuarios from "./components/Usuarios";
import Pagamentos from "./components/Pagamentos";
import LogsESistema from "./components/LogsESistema";

import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const router = useRouter();
  const [dataAtual, setDataAtual] = useState("");
  const [horaAtual, setHoraAtual] = useState("");

  useEffect(() => {
    const atualizarDataHora = () => {
      const agora = new Date();
      const dias = [
        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado",
      ];
      const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];
      const diaSemana = dias[agora.getDay()];
      const dia = agora.getDate();
      const mes = meses[agora.getMonth()];
      const ano = agora.getFullYear();
      setDataAtual(`${diaSemana}, ${dia} de ${mes} de ${ano}`);
      const hora = agora.getHours().toString().padStart(2, "0");
      const minuto = agora.getMinutes().toString().padStart(2, "0");
      setHoraAtual(`${hora}:${minuto}`);
    };
    atualizarDataHora();
    const intervalo = setInterval(atualizarDataHora, 1000 * 60);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        .dashboard-tabs [data-state="active"] {
          background-color: var(--tab-active-bg);
          color: var(--tab-active-color);
          border: none !important;
          box-shadow: none !important;
        }
        .dashboard-tabs [data-state="active"]:hover {
          border: none !important;
        }
        .dashboard-tabs [data-state="active"]:focus {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="flex flex-col gap-1 bg-gradient-to-r from-indigo-500 to-purple-700 p-6 pb-4">
        <div className="mx-10 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">
              Painel Administrativo
            </h1>
            <span className="text-xs text-white/80">
              Gestão completa do sistema
            </span>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Calendar size={16} />
              <span>{dataAtual}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Clock size={16} />
              <span>{horaAtual}</span>
            </div>
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="text-white">
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="fixed top-0 right-0 z-[9999] flex h-full w-72 max-w-full flex-col border-none bg-gradient-to-b from-indigo-500 to-purple-700 p-0 text-white"
              >
                <div className="flex flex-col gap-6 p-6 pt-16">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">Painel Administrativo</h1>
                    <span className="text-xs text-white/80">
                      Gestão completa do sistema
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Calendar size={16} />
                    <span>{dataAtual}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Clock size={16} />
                    <span>{horaAtual}</span>
                  </div>
                  <Badge className="w-fit bg-green-500 text-white">
                    Sistema Online
                  </Badge>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-2 flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Dashboard Administrativo</h2>
            <span className="text-muted-foreground text-sm">
              Sistema completo de gestão de usuários e analytics
            </span>
          </div>
        </div>
        <Tabs defaultValue="visao-geral" className="dashboard-tabs mt-4 w-full">
          <TabsList
            className="flex w-full"
            style={{ backgroundColor: "#1E293B" }}
          >
            <TabsTrigger
              value="visao-geral"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Usuários
            </TabsTrigger>
            <TabsTrigger
              value="pagamentos"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Pagamentos
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Logs & Sistema
            </TabsTrigger>
          </TabsList>
          <TabsContent value="visao-geral">
            <VisaoGeral />
          </TabsContent>
          <TabsContent value="usuarios">
            <Usuarios />
          </TabsContent>
          <TabsContent value="pagamentos">
            <Pagamentos />
          </TabsContent>
          <TabsContent value="logs">
            <LogsESistema />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
